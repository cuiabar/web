import { useEffect, useState } from 'react';
import { getRouteSeo } from '../data/seo';
import { useSeo } from '../hooks/useSeo';

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

const MARMITA_DATA_URL = 'https://marmita-api.cuiabar.com/data.json';
const RESTAURANT_WHATSAPP_URL = 'https://wa.me/551933058878?text=Ol%C3%A1!%20Quero%20pedir%20uma%20marmita%20do%20Cuiabar.';

const sections = [
  {
    key: 'classicas',
    title: 'Marmitas Clássicas',
    description: 'Sabores recorrentes do almoço, com leitura rápida e preço direto.',
  },
  {
    key: 'especiais',
    title: 'Marmitas Especiais',
    description: 'Opções com giro do dia e pratos que entram para variar o cardápio.',
  },
  {
    key: 'massas',
    title: 'Massas & Risotos',
    description: 'Massas, risotos e pratos mais completos para quem quer uma opção mais especial.',
  },
] as const;

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

const formatUpdatedAt = (value: string) =>
  new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  }).format(new Date(value));

const buildItemWhatsappUrl = (itemName: string, sectionTitle: string) =>
  `https://wa.me/551933058878?text=${encodeURIComponent(
    `Olá! Quero pedir uma marmita do Cuiabar. Tenho interesse em "${itemName}" da seção ${sectionTitle}.`,
  )}`;

const MarmitaPage = () => {
  useSeo(getRouteSeo('/marmita'));

  const [snapshot, setSnapshot] = useState<MarmitaSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadSnapshot = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const response = await fetch(MARMITA_DATA_URL, {
          signal: controller.signal,
          headers: {
            accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Falha ao carregar o cardápio (${response.status}).`);
        }

        const data = (await response.json()) as MarmitaSnapshot;
        setSnapshot(data);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar o cardápio agora.');
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadSnapshot();

    return () => controller.abort();
  }, []);

  return (
    <div className="bg-[linear-gradient(180deg,#fffaf2_0%,#f7efe1_52%,#f3e7d8_100%)]">
      <section className="container-shell py-12 sm:py-16">
        <div className="overflow-hidden rounded-[2rem] border border-cocoa/10 bg-[linear-gradient(145deg,rgba(255,252,246,0.96),rgba(247,234,216,0.96))] p-6 shadow-[0_28px_80px_-52px_rgba(59,33,17,0.5)] sm:p-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-terracotta/90">Cuiabar Marmita</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-end">
            <div>
              <h1 className="max-w-3xl font-heading text-4xl leading-[0.94] text-cocoa sm:text-6xl">
                Marmitas e massas em leitura rápida, sem ruído.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
                Esta página espelha automaticamente o Expresso Cuiabar e mostra apenas Marmitas Clássicas, Marmitas
                Especiais e Massas & Risotos. Atualização automática diária às 09:30.
              </p>
            </div>
            <div className="grid gap-3 rounded-[1.6rem] border border-cocoa/10 bg-white/70 p-4 text-sm text-cocoa/88 shadow-[0_20px_50px_-38px_rgba(59,33,17,0.42)]">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-terracotta/90">Última atualização</p>
                <p className="mt-2 text-base font-semibold text-cocoa">
                  {snapshot ? formatUpdatedAt(snapshot.updatedAt) : isLoading ? 'Carregando...' : 'Ainda sem leitura'}
                </p>
              </div>
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-terracotta/90">Canal oficial de pedido</p>
                <p className="mt-2 leading-relaxed">Confirme disponibilidade e finalize o pedido direto pelo WhatsApp.</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={RESTAURANT_WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-cocoa px-5 text-sm font-semibold text-white transition hover:bg-[#4b2f1e]"
                >
                  Pedir no WhatsApp
                </a>
                <a
                  href={snapshot?.sourceUrl ?? 'https://expresso.cuiabar.com/loja/pedidos'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-cocoa/12 bg-white/72 px-5 text-sm font-semibold text-cocoa transition hover:border-terracotta/30 hover:text-terracotta"
                >
                  Abrir loja completa
                </a>
              </div>
            </div>
          </div>
        </div>

        {errorMessage ? (
          <div className="mt-6 rounded-[1.5rem] border border-[#b56e45]/20 bg-[#fff3eb] px-5 py-4 text-sm leading-relaxed text-[#7a4422]">
            Não conseguimos atualizar o espelho agora. {errorMessage} Você ainda pode seguir pelo WhatsApp ou abrir a
            loja completa.
          </div>
        ) : null}

        <div className="mt-8 grid gap-5">
          {sections.map((section) => {
            const items = snapshot ? snapshot[section.key] : [];

            return (
              <section
                key={section.key}
                className="rounded-[1.9rem] border border-cocoa/10 bg-white/78 p-5 shadow-[0_24px_70px_-52px_rgba(59,33,17,0.5)] sm:p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-terracotta/90">Espelho automático</p>
                    <h2 className="mt-2 font-heading text-3xl leading-none text-cocoa sm:text-[2.5rem]">{section.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-steel sm:text-[0.98rem]">{section.description}</p>
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-steel/70">
                    {isLoading ? 'Sincronizando...' : `${items.length} item${items.length === 1 ? '' : 's'}`}
                  </p>
                </div>

                {isLoading ? (
                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="animate-pulse rounded-[1.5rem] border border-cocoa/8 bg-[#f7efe5] p-4">
                        <div className="aspect-[5/4] rounded-[1.1rem] bg-[#eadbc8]" />
                        <div className="mt-4 h-4 w-2/3 rounded-full bg-[#eadbc8]" />
                        <div className="mt-3 h-3 w-full rounded-full bg-[#efe3d3]" />
                        <div className="mt-2 h-3 w-5/6 rounded-full bg-[#efe3d3]" />
                        <div className="mt-4 h-9 w-32 rounded-full bg-[#eadbc8]" />
                      </div>
                    ))}
                  </div>
                ) : items.length ? (
                  <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                      <article
                        key={item.id}
                        className={`overflow-hidden rounded-[1.6rem] border p-4 transition ${
                          item.disponivel
                            ? 'border-cocoa/8 bg-[#fffdf8] shadow-[0_24px_60px_-50px_rgba(59,33,17,0.42)]'
                            : 'border-[#7f756d]/10 bg-[#efebe6] text-[#675d56]'
                        }`}
                      >
                        {item.imagem ? (
                          <div className="relative">
                            <img
                              src={item.imagem}
                              alt={`Foto ilustrativa de ${item.nome}`}
                              loading="lazy"
                              className={`aspect-[5/4] w-full rounded-[1.15rem] object-cover ${item.disponivel ? '' : 'grayscale-[0.18] opacity-80'}`}
                            />
                            <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white">
                              Foto ilustrativa
                            </span>
                          </div>
                        ) : null}

                        <div className="mt-4 flex items-start justify-between gap-3">
                          <h3 className="text-xl font-semibold leading-tight text-cocoa">{item.nome}</h3>
                          <span
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                              item.disponivel ? 'bg-[#f4e3d4] text-cocoa' : 'bg-white/70 text-[#6e655e]'
                            }`}
                          >
                            {formatCurrency(item.preco, item.precoPrefixo)}
                          </span>
                        </div>

                        <p className="mt-3 text-sm leading-relaxed text-steel">{item.descricao || 'Descrição em atualização.'}</p>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                          <span
                            className={`text-[0.72rem] font-semibold uppercase tracking-[0.18em] ${
                              item.disponivel ? 'text-[#2f7c49]' : 'text-[#7b726b]'
                            }`}
                          >
                            {item.disponivel ? 'Disponível' : 'Indisponível no momento'}
                          </span>
                          {item.disponivel ? (
                            <a
                              href={buildItemWhatsappUrl(item.nome, section.title)}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-10 items-center justify-center rounded-full bg-terracotta px-4 text-sm font-semibold text-white transition hover:bg-[#ca4d30]"
                            >
                              Pedir item
                            </a>
                          ) : (
                            <span className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#7f756d]/12 bg-white/50 px-4 text-sm font-semibold text-[#6e655e]">
                              Pedido indisponível
                            </span>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 rounded-[1.4rem] border border-cocoa/8 bg-[#faf4ec] px-4 py-5 text-sm leading-relaxed text-steel">
                    Nenhum item apareceu nesta categoria na última sincronização.
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default MarmitaPage;
