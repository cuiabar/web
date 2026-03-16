import puppeteer from '@cloudflare/puppeteer';

type MarmitaSectionKey = 'classicas' | 'especiais' | 'massas';

type MarmitaItem = {
  id: string;
  nome: string;
  descricao: string;
  preco: number | null;
  precoPrefixo: 'a_partir' | '';
  disponivel: boolean;
  status: string;
  imagem: string | null;
};

type MarmitaSnapshot = {
  updatedAt: string;
  sourceUrl: string;
  classicas: MarmitaItem[];
  especiais: MarmitaItem[];
  massas: MarmitaItem[];
};

type RefreshResult = {
  ok: boolean;
  snapshot?: MarmitaSnapshot;
  fromFallback?: boolean;
  error?: string;
};

type Env = {
  MARMITA_CACHE: KVNamespace;
  BROWSER: Fetcher;
  MARMITA_SOURCE_URL?: string;
  MARMITA_WHATSAPP_NUMBER?: string;
  MARMITA_WHATSAPP_MESSAGE?: string;
  MARMITA_REFRESH_TOKEN?: string;
  MARMITA_ALERT_WEBHOOK_URL?: string;
};

const CACHE_KEY_LATEST = 'marmita:latest';
const CACHE_KEY_PREVIOUS = 'marmita:previous';
const CACHE_KEY_LAST_SUCCESS = 'marmita:last-success';
const CACHE_KEY_LAST_ERROR = 'marmita:last-error';

const SECTION_MAP: Record<
  string,
  {
    key: MarmitaSectionKey;
    title: string;
    description: string;
  }
> = {
  '70029': {
    key: 'classicas',
    title: 'Marmitas Clássicas',
    description: 'Sabores que temos todos os dias, com leitura rápida para pedido no almoço.',
  },
  '70031': {
    key: 'especiais',
    title: 'Marmitas Especiais',
    description: 'Itens do dia com giro variado e uma pegada mais especial no cardápio.',
  },
  '130599': {
    key: 'massas',
    title: 'Massas & Risotos',
    description: 'Opções para quem quer uma escolha mais cremosa, reconfortante e completa.',
  },
};

const CACHE_CONTROL_PUBLIC = 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=300';

const json = (data: unknown, init?: ResponseInit) =>
  new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      ...(init?.headers ?? {}),
    },
  });

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

const normalizeText = (value: string | null | undefined) => (value ?? '').replace(/\s+/g, ' ').trim();

const formatCurrency = (value: number | null, prefix: 'a_partir' | '') => {
  if (value == null) {
    return 'Consulte o valor';
  }

  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return prefix === 'a_partir' ? `a partir de ${formatted}` : formatted;
};

const formatDateTime = (value: string | null | undefined) => {
  if (!value) {
    return 'Ainda não atualizado';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value));
};

const buildWhatsAppHref = (env: Env, itemName?: string, sectionTitle?: string) => {
  const number = env.MARMITA_WHATSAPP_NUMBER ?? '551933058878';
  const baseMessage = env.MARMITA_WHATSAPP_MESSAGE ?? 'Olá! Quero pedir uma marmita do Cuiabar.';
  const contextualMessage =
    itemName && sectionTitle
      ? `${baseMessage} Tenho interesse em "${itemName}" da seção ${sectionTitle}.`
      : baseMessage;

  return `https://wa.me/${number}?text=${encodeURIComponent(contextualMessage)}`;
};

const derivePrice = (item: Record<string, unknown>) => {
  const candidates = [
    item.preco_promocional_com_complementos,
    item.preco_promocional_mkt_com_complementos,
    item.preco_com_complementos,
    item.preco_mkt_com_complementos,
    item.preco_promocional,
    item.preco,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'number' && Number.isFinite(candidate) && candidate > 0) {
      return candidate;
    }
  }

  return null;
};

const isAvailableStatus = (status: string) => !status.toLowerCase().includes('indispon');

const alertOnError = async (env: Env, message: string, extra?: Record<string, unknown>) => {
  if (!env.MARMITA_ALERT_WEBHOOK_URL) {
    return;
  }

  await fetch(env.MARMITA_ALERT_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      text: 'Falha no espelhamento de marmitas do Cuiabar.',
      message,
      extra,
      createdAt: new Date().toISOString(),
    }),
  }).catch(() => undefined);
};

const transformSnapshot = (rawSections: Record<string, { nome: string; itens: Record<string, Record<string, unknown>> }>, sourceUrl: string): MarmitaSnapshot => {
  const snapshot: MarmitaSnapshot = {
    updatedAt: new Date().toISOString(),
    sourceUrl,
    classicas: [],
    especiais: [],
    massas: [],
  };

  for (const [categoryId, section] of Object.entries(rawSections)) {
    const target = SECTION_MAP[categoryId];
    if (!target) {
      continue;
    }

    const normalizedItems = Object.values(section.itens ?? {})
      .map((item) => {
        const status = normalizeText(typeof item.status === 'string' ? item.status : '');
        return {
          id: String(item.id ?? ''),
          nome: normalizeText(typeof item.nome === 'string' ? item.nome : ''),
          descricao: normalizeText(typeof item.descricao === 'string' ? item.descricao : ''),
          preco: derivePrice(item),
          precoPrefixo: (typeof item.preco_prefix === 'string' && item.preco_prefix === 'a_partir' ? 'a_partir' : '') as 'a_partir' | '',
          disponivel: isAvailableStatus(status || 'disponivel'),
          status: status || 'disponivel',
          imagem:
            normalizeText(typeof item.foto_principal === 'string' ? item.foto_principal : '') ||
            normalizeText(typeof item.foto_thumbnail === 'string' ? item.foto_thumbnail : '') ||
            null,
          ordem: typeof item.ordem === 'number' ? item.ordem : Number(item.ordem ?? 0),
        };
      })
      .sort((a, b) => a.ordem - b.ordem)
      .map(({ ordem: _ordem, ...item }) => item);

    snapshot[target.key] = normalizedItems;
  }

  return snapshot;
};

const extractCatalog = async (env: Env) => {
  const sourceUrl = env.MARMITA_SOURCE_URL ?? 'https://expresso.cuiabar.com/loja/pedidos';
  const browser = await puppeteer.launch(env.BROWSER);

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1400, deviceScaleFactor: 1 });
    await page.goto(sourceUrl, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#cat_70029 .product, #cat_70029 .div-block-569', { timeout: 45000 });

    const rawSections = await page.evaluate((sectionIds) => {
      const root = document.querySelector('#app, [data-app], body > div') as
        | (Element & {
            __vue_app__?: {
              _context?: {
                config?: {
                  globalProperties?: {
                    $pinia?: {
                      state?: {
                        value?: {
                          catalogo?: {
                            data?: {
                              categorias?: Record<string, { nome: string; itens: Record<string, Record<string, unknown>> }>;
                            };
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          })
        | null;

      const categorias = root?.__vue_app__?._context?.config?.globalProperties?.$pinia?.state?.value?.catalogo?.data?.categorias;
      if (!categorias) {
        throw new Error('Estado do catálogo não encontrado na loja do Expresso.');
      }

      const picked: Record<string, { nome: string; itens: Record<string, Record<string, unknown>> }> = {};
      for (const sectionId of sectionIds) {
        const section = categorias[sectionId];
        if (section) {
          picked[sectionId] = {
            nome: String(section.nome ?? ''),
            itens: section.itens ?? {},
          };
        }
      }

      return picked;
    }, Object.keys(SECTION_MAP));

    return transformSnapshot(rawSections, sourceUrl);
  } finally {
    await browser.close();
  }
};

const loadLatestSnapshot = async (env: Env) => env.MARMITA_CACHE.get<MarmitaSnapshot>(CACHE_KEY_LATEST, 'json');
const loadPreviousSnapshot = async (env: Env) => env.MARMITA_CACHE.get<MarmitaSnapshot>(CACHE_KEY_PREVIOUS, 'json');

const refreshSnapshot = async (env: Env): Promise<RefreshResult> => {
  try {
    const current = await loadLatestSnapshot(env);
    const snapshot = await extractCatalog(env);

    if (current) {
      await env.MARMITA_CACHE.put(CACHE_KEY_PREVIOUS, JSON.stringify(current));
    }

    await Promise.all([
      env.MARMITA_CACHE.put(CACHE_KEY_LATEST, JSON.stringify(snapshot)),
      env.MARMITA_CACHE.put(
        CACHE_KEY_LAST_SUCCESS,
        JSON.stringify({
          updatedAt: snapshot.updatedAt,
          counts: {
            classicas: snapshot.classicas.length,
            especiais: snapshot.especiais.length,
            massas: snapshot.massas.length,
          },
        }),
      ),
      env.MARMITA_CACHE.delete(CACHE_KEY_LAST_ERROR),
    ]);

    return { ok: true, snapshot };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha desconhecida ao atualizar marmitas.';

    await Promise.all([
      env.MARMITA_CACHE.put(CACHE_KEY_LAST_ERROR, JSON.stringify({ message, createdAt: new Date().toISOString() })),
      alertOnError(env, message),
    ]);

    const fallback = (await loadLatestSnapshot(env)) ?? (await loadPreviousSnapshot(env));
    if (fallback) {
      return { ok: false, snapshot: fallback, fromFallback: true, error: message };
    }

    return { ok: false, error: message };
  }
};

const buildSectionHtml = (title: string, description: string, items: MarmitaItem[], env: Env) => {
  const content = items.length
    ? items
        .map((item) => {
          const whatsappHref = buildWhatsAppHref(env, item.nome, title);
          return `
            <article class="item ${item.disponivel ? 'item--available' : 'item--unavailable'}">
              <div class="item__body">
                <div class="item__topline">
                  <h3>${escapeHtml(item.nome)}</h3>
                  <span class="item__price">${escapeHtml(formatCurrency(item.preco, item.precoPrefixo))}</span>
                </div>
                <p class="item__description">${escapeHtml(item.descricao || 'Descrição em atualização.')}</p>
                <div class="item__footer">
                  <span class="item__status">${item.disponivel ? 'Disponível' : 'Indisponível no momento'}</span>
                  ${
                    item.disponivel
                      ? `<a class="item__cta" href="${whatsappHref}" target="_blank" rel="noreferrer">Pedir no WhatsApp</a>`
                      : `<span class="item__cta item__cta--disabled" aria-disabled="true">Pedido indisponível</span>`
                  }
                </div>
              </div>
              ${
                item.imagem
                  ? `<img class="item__image" src="${item.imagem}" alt="Foto ilustrativa de ${escapeHtml(item.nome)}" loading="lazy" />`
                  : ''
              }
            </article>
          `;
        })
        .join('')
    : `<div class="empty-state">Nenhum item disponível nesta categoria no último espelhamento.</div>`;

  return `
    <section class="section-block" aria-labelledby="${title.toLowerCase().replaceAll(/\s+/g, '-')}">
      <div class="section-block__header">
        <p class="section-block__eyebrow">Atualização automática</p>
        <h2 id="${title.toLowerCase().replaceAll(/\s+/g, '-')}">${escapeHtml(title)}</h2>
        <p>${escapeHtml(description)}</p>
      </div>
      <div class="items-grid">
        ${content}
      </div>
    </section>
  `;
};

const renderPage = async (env: Env, snapshot: MarmitaSnapshot, meta?: { stale?: boolean; error?: string | null }) => {
  const sections = [
    { title: SECTION_MAP['70029'].title, description: SECTION_MAP['70029'].description, items: snapshot.classicas },
    { title: SECTION_MAP['70031'].title, description: SECTION_MAP['70031'].description, items: snapshot.especiais },
    { title: SECTION_MAP['130599'].title, description: SECTION_MAP['130599'].description, items: snapshot.massas },
  ];

  const errorBanner =
    meta?.stale && meta?.error
      ? `<div class="alert">Exibindo o último snapshot válido. A atualização mais recente falhou: ${escapeHtml(meta.error)}</div>`
      : '';

  const html = `<!doctype html>
  <html lang="pt-BR">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Cuiabar Marmita | Clássicas, especiais e massas</title>
      <meta
        name="description"
        content="Veja as marmitas clássicas, especiais e massas do Cuiabar em uma página rápida, atualizada automaticamente e com pedido direto pelo WhatsApp."
      />
      <meta property="og:title" content="Cuiabar Marmita" />
      <meta
        property="og:description"
        content="Cardápio espelhado de marmitas do Cuiabar com atualização automática e leitura rápida no mobile."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://cuiabar.com/marmita" />
      <meta property="og:image" content="https://cuiabar.com/favicon.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Cuiabar Marmita" />
      <meta
        name="twitter:description"
        content="Marmitas Clássicas, Marmitas Especiais e Massas & Risotos do Cuiabar em leitura rápida e objetiva."
      />
      <link rel="canonical" href="https://cuiabar.com/marmita" />
      <link rel="icon" href="https://cuiabar.com/favicon.png" />
      <style>
        :root {
          color-scheme: light;
          --bg: #f8f1e6;
          --surface: rgba(255, 252, 248, 0.94);
          --surface-strong: #fffaf3;
          --border: rgba(92, 58, 28, 0.12);
          --text: #341d10;
          --muted: #7e624a;
          --brand: #ab4b22;
          --brand-dark: #5d2d16;
          --ok: #2f7c49;
          --off: #8f8174;
          --shadow: 0 24px 60px -38px rgba(52, 29, 16, 0.34);
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: var(--text);
          background:
            radial-gradient(circle at top right, rgba(171, 75, 34, 0.14), transparent 26%),
            radial-gradient(circle at left center, rgba(47, 124, 73, 0.12), transparent 24%),
            linear-gradient(180deg, #fdf8ef 0%, var(--bg) 100%);
        }
        a { color: inherit; text-decoration: none; }
        .page {
          width: min(1180px, calc(100% - 28px));
          margin: 0 auto;
          padding: 22px 0 40px;
        }
        .hero {
          background: linear-gradient(145deg, rgba(255, 251, 243, 0.98), rgba(246, 233, 216, 0.96));
          border: 1px solid var(--border);
          border-radius: 28px;
          box-shadow: var(--shadow);
          padding: 24px 18px;
        }
        .hero__eyebrow {
          margin: 0;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--brand);
          font-weight: 700;
        }
        .hero h1 {
          margin: 10px 0 0;
          font-size: clamp(2.1rem, 8vw, 4.2rem);
          line-height: 0.95;
          letter-spacing: -0.03em;
        }
        .hero__lead {
          margin: 14px 0 0;
          font-size: 1rem;
          line-height: 1.6;
          color: var(--muted);
          max-width: 58rem;
        }
        .hero__meta {
          display: grid;
          gap: 12px;
          margin-top: 20px;
        }
        .meta-card {
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.7);
          border-radius: 18px;
          padding: 14px 15px;
        }
        .meta-card strong {
          display: block;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--brand);
          margin-bottom: 6px;
        }
        .cta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 18px;
        }
        .cta-primary, .cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 0 18px;
          border-radius: 999px;
          font-weight: 700;
        }
        .cta-primary {
          background: var(--brand);
          color: #fff;
        }
        .cta-secondary {
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.78);
          color: var(--brand-dark);
        }
        .alert {
          margin-top: 16px;
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(171, 75, 34, 0.18);
          background: rgba(171, 75, 34, 0.08);
          color: var(--brand-dark);
          line-height: 1.5;
        }
        .sections {
          display: grid;
          gap: 18px;
          margin-top: 18px;
        }
        .section-block {
          border: 1px solid var(--border);
          background: var(--surface);
          border-radius: 26px;
          box-shadow: var(--shadow);
          padding: 18px 16px;
        }
        .section-block__eyebrow {
          margin: 0 0 6px;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--brand);
          font-weight: 700;
        }
        .section-block h2 {
          margin: 0;
          font-size: clamp(1.5rem, 6vw, 2.4rem);
          line-height: 1;
        }
        .section-block__header p:last-child {
          margin: 10px 0 0;
          color: var(--muted);
          line-height: 1.6;
        }
        .items-grid {
          display: grid;
          gap: 12px;
          margin-top: 18px;
        }
        .item {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
          border-radius: 22px;
          padding: 14px;
          border: 1px solid rgba(92, 58, 28, 0.08);
          background: var(--surface-strong);
        }
        .item--unavailable {
          background: rgba(235, 230, 224, 0.9);
          color: #5e554e;
        }
        .item__topline {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .item__topline h3 {
          margin: 0;
          font-size: 1.2rem;
          line-height: 1.2;
        }
        .item__price {
          align-self: flex-start;
          border-radius: 999px;
          padding: 7px 12px;
          background: #f4e5d7;
          color: var(--brand-dark);
          font-weight: 700;
          font-size: 0.92rem;
        }
        .item--unavailable .item__price {
          background: rgba(255,255,255,0.62);
          color: #72685f;
        }
        .item__description {
          margin: 10px 0 0;
          color: var(--muted);
          line-height: 1.6;
        }
        .item__footer {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
        }
        .item__status {
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ok);
        }
        .item--unavailable .item__status {
          color: var(--off);
        }
        .item__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 14px;
          border-radius: 999px;
          background: var(--brand-dark);
          color: #fff;
          font-size: 0.92rem;
          font-weight: 700;
        }
        .item__cta--disabled {
          background: rgba(107, 95, 85, 0.14);
          color: #6c6259;
        }
        .item__image {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 18px;
          border: 1px solid rgba(92, 58, 28, 0.08);
          background: #f2e7db;
        }
        .empty-state {
          border-radius: 18px;
          padding: 18px;
          background: rgba(255,255,255,0.72);
          color: var(--muted);
          line-height: 1.6;
        }
        .footer {
          margin-top: 18px;
          text-align: center;
          color: var(--muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }
        @media (min-width: 720px) {
          .page { width: min(1180px, calc(100% - 48px)); padding-top: 26px; }
          .hero { padding: 30px 26px; }
          .hero__meta { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .section-block { padding: 24px 22px; }
          .item {
            grid-template-columns: minmax(0, 1fr) 160px;
            align-items: start;
          }
          .item__image { aspect-ratio: 1 / 1; }
          .item__topline {
            flex-direction: row;
            justify-content: space-between;
            align-items: start;
          }
          .sections { gap: 22px; margin-top: 22px; }
        }
      </style>
    </head>
    <body>
      <main class="page">
        <section class="hero">
          <p class="hero__eyebrow">Cuiabar Marmita</p>
          <h1>Marmitas e massas em leitura direta.</h1>
          <p class="hero__lead">
            Esta página espelha automaticamente o cardápio do Expresso Cuiabar e mostra apenas as categorias de marmitas clássicas,
            especiais e massas & risotos, com foco em leitura rápida no celular.
          </p>
          <div class="hero__meta">
            <div class="meta-card">
              <strong>Última atualização</strong>
              <span>${escapeHtml(formatDateTime(snapshot.updatedAt))}</span>
            </div>
            <div class="meta-card">
              <strong>Fonte do cardápio</strong>
              <span>Expresso Cuiabar | Marmitaria</span>
            </div>
            <div class="meta-card">
              <strong>Atualização automática</strong>
              <span>Diariamente às 09:30</span>
            </div>
          </div>
          <div class="cta-row">
            <a class="cta-primary" href="${buildWhatsAppHref(env)}" target="_blank" rel="noreferrer">Pedir no WhatsApp</a>
            <a class="cta-secondary" href="${escapeHtml(snapshot.sourceUrl)}" target="_blank" rel="noreferrer">Abrir loja completa</a>
          </div>
          ${errorBanner}
        </section>

        <div class="sections">
          ${sections.map((section) => buildSectionHtml(section.title, section.description, section.items, env)).join('')}
        </div>

        <footer class="footer">
          Espelho automático do cardápio de marmitas do Cuiabar. Em caso de dúvida sobre disponibilidade, confirme no WhatsApp.
        </footer>
      </main>
    </body>
  </html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': CACHE_CONTROL_PUBLIC,
    },
  });
};

const isAuthorized = (request: Request, env: Env) => {
  const url = new URL(request.url);
  const token = url.searchParams.get('token') ?? request.headers.get('x-refresh-token');
  return Boolean(token && env.MARMITA_REFRESH_TOKEN && token === env.MARMITA_REFRESH_TOKEN);
};

const serveHealth = async (env: Env) => {
  const [latest, previous, lastSuccess, lastError] = await Promise.all([
    loadLatestSnapshot(env),
    loadPreviousSnapshot(env),
    env.MARMITA_CACHE.get(CACHE_KEY_LAST_SUCCESS, 'text'),
    env.MARMITA_CACHE.get(CACHE_KEY_LAST_ERROR, 'text'),
  ]);

  return json({
    ok: true,
    hasLatestSnapshot: Boolean(latest),
    hasPreviousSnapshot: Boolean(previous),
    latestUpdatedAt: latest?.updatedAt ?? null,
    lastSuccess: lastSuccess ? JSON.parse(lastSuccess) : null,
    lastError: lastError ? JSON.parse(lastError) : null,
  });
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    if (pathname === '/marmita/admin/refresh') {
      if (!isAuthorized(request, env)) {
        return json({ ok: false, error: 'Não autorizado.' }, { status: 401 });
      }

      const result = await refreshSnapshot(env);
      return json(result, { status: result.ok ? 200 : 502 });
    }

    if (pathname === '/marmita/health') {
      return serveHealth(env);
    }

    if (pathname === '/marmita/data.json') {
      const snapshot = (await loadLatestSnapshot(env)) ?? (await loadPreviousSnapshot(env));
      if (!snapshot) {
        ctx.waitUntil(refreshSnapshot(env));
        return json({ ok: false, error: 'Snapshot ainda não disponível.' }, { status: 503 });
      }
      return new Response(JSON.stringify(snapshot, null, 2), {
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': CACHE_CONTROL_PUBLIC,
        },
      });
    }

    if (pathname !== '/marmita') {
      return new Response('Not found', { status: 404 });
    }

    const latest = await loadLatestSnapshot(env);
    if (latest) {
      return renderPage(env, latest);
    }

    const refreshed = await refreshSnapshot(env);
    if (refreshed.snapshot) {
      return renderPage(env, refreshed.snapshot, {
        stale: refreshed.fromFallback,
        error: refreshed.error ?? null,
      });
    }

    return new Response(
      'Ainda não foi possível carregar o cardápio de marmitas. Tente novamente em instantes.',
      {
        status: 503,
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
        },
      },
    );
  },

  async scheduled(_controller: ScheduledController, env: Env, ctx: ExecutionContext) {
    ctx.waitUntil(refreshSnapshot(env));
  },
};
