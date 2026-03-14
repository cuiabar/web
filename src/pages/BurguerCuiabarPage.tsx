import { Reveal } from '../components/Reveal';
import { getRouteSeo } from '../data/seo';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const burgerInstagramUrl = 'https://instagram.com/burgercuiabar';

const pilotSignals = [
  '🍔 Projeto piloto da house Cuiabar',
  '🥩 Carnes selecionadas e preparo na chapa',
  '🛵 Pedido pelo site, iFood ou WhatsApp',
];

const menuSections = [
  {
    title: 'Lanches',
    eyebrow: '🍔 Burgers na chapa',
    items: [
      {
        name: 'X-Tradicional',
        price: 'R$ 22,90',
        description:
          'Pão brioche levemente tostado, hambúrguer Texas sabor picanha, queijo mussarela derretido, alface americana fresca e tomate. Um burger clássico, simples e equilibrado.',
      },
      {
        name: 'Picanha Clássico',
        price: 'R$ 34,40',
        description:
          'Pão brioche tostado na chapa, hambúrguer de picanha 120g preparado no ponto, queijo mussarela derretido, alface americana, tomate fresco e baconnese. Burger suculento com sabor marcante de picanha.',
      },
      {
        name: 'Picanha Bacon',
        price: 'R$ 40,10',
        description:
          'Pão brioche tostado, hambúrguer de picanha 120g, queijo cheddar cremoso, bacon em tiras crocantes, cebola salteada na manteiga e baconnese da casa. Uma opção intensa, com textura e sabor mais robustos.',
      },
    ],
  },
  {
    title: 'Combos',
    eyebrow: '🍟 Todos incluem o hambúrguer escolhido',
    items: [
      {
        name: 'Combo X-Tradicional + fritas OU bebida',
        price: 'R$ 30,90',
        description: 'Inclui X-Tradicional acompanhado de porção individual de batata frita ou 1 bebida lata.',
      },
      {
        name: 'Combo Picanha Clássico + fritas OU bebida',
        price: 'R$ 42,40',
        description: 'Inclui Picanha Clássico acompanhado de porção individual de batata frita ou 1 bebida lata.',
      },
      {
        name: 'Combo Picanha Bacon + fritas OU bebida',
        price: 'R$ 48,20',
        description: 'Inclui Picanha Bacon acompanhado de porção individual de batata frita ou 1 bebida lata.',
      },
      {
        name: 'Combo X-Tradicional completo',
        price: 'R$ 36,70',
        description: 'X-Tradicional + porção de batata frita + 1 bebida lata.',
      },
      {
        name: 'Combo Picanha Clássico completo',
        price: 'R$ 48,20',
        description: 'Picanha Clássico + porção de batata frita + 1 bebida lata.',
      },
      {
        name: 'Combo Picanha Bacon completo',
        price: 'R$ 53,90',
        description: 'Picanha Bacon + porção de batata frita + 1 bebida lata.',
      },
    ],
  },
];

const orderChannels = [
  {
    label: 'Pedir no site',
    href: siteConfig.burguerOrderLinks.direct,
    helper: 'Canal direto do Cuiabar',
    emoji: '🍔',
  },
  {
    label: 'Pedir no iFood',
    href: siteConfig.burguerOrderLinks.ifood,
    helper: 'Loja oficial do Burguer Cuiabar',
    emoji: '🛵',
  },
  {
    label: 'Falar no WhatsApp',
    href: `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Quero pedir no Burguer Cuiabar.')}`,
    helper: 'Atendimento para dúvidas e apoio no pedido',
    emoji: '💬',
  },
];

const BurguerCuiabarPage = () => {
  useSeo(getRouteSeo('/burguer'));

  return (
    <section className="burger-page relative overflow-hidden bg-[#feddb5] text-[#2e0501]">
      <div className="container-shell relative space-y-10 py-14">
        <Reveal
          as="a"
          href={burgerInstagramUrl}
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col gap-4 overflow-hidden rounded-[2rem] border border-[#6c4336]/12 bg-[linear-gradient(135deg,#2e0501_0%,#511215_48%,#b64811_100%)] px-5 py-5 text-white shadow-[0_28px_70px_-40px_rgba(46,5,1,0.76)] sm:px-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/8">
              <img src="/burguer/logo-burger-cuiabar.png" alt="Logo do Burguer Cuiabar" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Instagram oficial</p>
              <p className="mt-1 font-heading text-2xl sm:text-3xl">Siga o Burguer Cuiabar</p>
              <p className="mt-1 text-sm text-white/76">Acompanhe novidades, fotos, lançamentos e atualizações do projeto em @burgercuiabar.</p>
            </div>
          </div>
          <div className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-[#2e0501]">
            Seguir @burgercuiabar
          </div>
        </Reveal>

        <Reveal
          as="header"
          className="overflow-hidden rounded-[2.8rem] border border-[#6c4336]/12 bg-[linear-gradient(135deg,#fffbd6_0%,#fcf2d0_44%,#feddb5_100%)] px-6 py-8 shadow-[0_42px_110px_-56px_rgba(46,5,1,0.46)] sm:px-8 lg:px-10 lg:py-10"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[1.7rem] border border-[#6c4336]/12 bg-[#1f5b3b] shadow-[0_18px_40px_-24px_rgba(46,5,1,0.45)]">
                  <img src="/burguer/logo-burger-cuiabar.png" alt="Logo do Burguer Cuiabar" className="h-full w-full object-cover" />
                </div>
                <div className="inline-flex items-center rounded-full border border-[#6c4336]/12 bg-white/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#b64811]">
                  Burger Cuiabar
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {pilotSignals.map((badge) => (
                  <span key={badge} className="rounded-full border border-[#6c4336]/10 bg-white/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2e0501]">
                    {badge}
                  </span>
                ))}
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b64811]">Projeto piloto do Cuiabar</p>
                <h1 className="mt-3 max-w-3xl font-heading text-5xl leading-[0.92] text-[#2e0501] sm:text-6xl lg:text-[5.2rem]">
                  Cardápio oficial do Burger Cuiabar.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6c4336] sm:text-lg">
                  Hambúrgueres preparados na chapa, com carnes selecionadas e montagem artesanal. Um projeto especial da house Cuiabar,
                  com operação enxuta e cardápio direto para validar a proposta.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.burguerOrderLinks.direct}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#b64811] px-7 py-3 text-sm font-semibold text-white shadow-[0_24px_48px_-26px_rgba(182,72,17,0.84)] transition hover:-translate-y-1 hover:bg-[#2e0501]"
                >
                  Pedir no site
                </a>
                <a
                  href={siteConfig.burguerOrderLinks.ifood}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#6c4336]/14 bg-white/68 px-7 py-3 text-sm font-semibold text-[#2e0501] transition hover:-translate-y-1 hover:border-[#2e0501] hover:bg-[#2e0501] hover:text-white"
                >
                  Ver no iFood
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Reveal delay={80} className="rounded-[2rem] border border-white/60 bg-white/78 p-4 shadow-[0_28px_70px_-42px_rgba(46,5,1,0.34)]">
                <img src="/burguer/burger-classico.png" alt="Burger Cuiabar clássico" loading="eager" className="h-56 w-full rounded-[1.5rem] object-cover" />
                <div className="mt-4 rounded-[1.3rem] bg-[#fffbd6] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7e8427]">Picanha Clássico</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6c4336]">Pão brioche, picanha 120g, mussarela, alface, tomate e baconnese da casa.</p>
                </div>
              </Reveal>

              <Reveal delay={130} className="rounded-[2rem] border border-white/60 bg-white/78 p-4 shadow-[0_28px_70px_-42px_rgba(46,5,1,0.34)] sm:translate-y-8">
                <img src="/burguer/burger-bacon.png" alt="Burger Cuiabar com bacon" loading="eager" className="h-56 w-full rounded-[1.5rem] object-cover" />
                <div className="mt-4 rounded-[1.3rem] bg-[#fffbd6] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7e8427]">Picanha Bacon</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6c4336]">Cheddar cremoso, bacon crocante, cebola na manteiga e baconnese para um sabor mais intenso.</p>
                </div>
              </Reveal>

              <Reveal delay={180} className="rounded-[2rem] border border-white/60 bg-white/78 p-4 shadow-[0_28px_70px_-42px_rgba(46,5,1,0.34)] sm:col-span-2">
                <img src="/burguer/combo-frita-bebida.png" alt="Combo do Burger Cuiabar com fritas e bebida" loading="lazy" className="h-64 w-full rounded-[1.6rem] object-cover" />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[1.3rem] bg-[#2e0501] px-5 py-4 text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Projeto em teste</p>
                    <p className="mt-1 text-sm text-white/84">Cardápio compacto para validar operação, aceitação e velocidade do pedido.</p>
                  </div>
                  <span className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
                    House Cuiabar
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <Reveal className="rounded-[2.4rem] border border-[#d7a55c]/34 bg-[linear-gradient(135deg,#fffbd6_0%,#fcf2d0_54%,#feddb5_100%)] p-8 shadow-[0_30px_80px_-46px_rgba(46,5,1,0.28)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7e8427]">Cardápio</p>
            <div className="mt-6 space-y-6">
              {menuSections.map((section, sectionIndex) => (
                <Reveal key={section.title} delay={sectionIndex * 80} className="rounded-[2rem] border border-[#e3ba99]/55 bg-white/80 p-5 shadow-[0_18px_50px_-38px_rgba(46,5,1,0.2)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#b64811]">{section.eyebrow}</p>
                  <h2 className="mt-2 font-heading text-4xl text-[#2e0501]">{section.title}</h2>
                  <div className="mt-5 space-y-4">
                    {section.items.map((item) => (
                      <article key={item.name} className="rounded-[1.5rem] border border-[#2e0501]/8 bg-[#fffdf2] px-4 py-4">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="font-heading text-2xl text-[#2e0501]">{item.name}</h3>
                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6c4336]">{item.description}</p>
                          </div>
                          <div className="shrink-0 rounded-full bg-[#2e0501] px-4 py-2 text-sm font-semibold text-white">{item.price}</div>
                        </div>
                      </article>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal className="rounded-[2.4rem] border border-[#2e0501]/10 bg-[linear-gradient(160deg,#2e0501_0%,#6c4336_52%,#b64811_100%)] p-8 text-white shadow-[0_34px_90px_-46px_rgba(46,5,1,0.78)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#feddb5]">Como pedir</p>
              <h2 className="mt-3 font-heading text-4xl text-white">Escolha o canal que preferir.</h2>
              <p className="mt-4 text-base leading-relaxed text-white/82">
                O piloto do Burger Cuiabar já está disponível nos canais oficiais. Site para pedido direto, iFood para conveniência e
                WhatsApp para apoio rápido da equipe.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                {orderChannels.map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-[1.5rem] border border-white/12 bg-white/10 px-5 py-4 transition hover:-translate-y-0.5 hover:bg-white/16"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl" aria-hidden>
                          {channel.emoji}
                        </span>
                        <div>
                          <p className="text-base font-semibold text-white">{channel.label}</p>
                          <p className="text-sm text-white/72">{channel.helper}</p>
                        </div>
                      </div>
                      <span className="text-lg text-white/82">↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="rounded-[2.4rem] border border-[#d7a55c]/26 bg-white/82 p-8 shadow-[0_30px_80px_-46px_rgba(46,5,1,0.28)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b64811]">Sobre o projeto</p>
              <h2 className="mt-3 font-heading text-4xl text-[#2e0501]">Burger Cuiabar em fase piloto.</h2>
              <p className="mt-4 text-base leading-relaxed text-[#6c4336]">
                Esta operação nasceu como um projeto piloto do Cuiabar para testar uma linha mais enxuta de burgers e combos, mantendo
                padrão de sabor, velocidade e praticidade no pedido.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-[#6c4336]">
                <li className="rounded-[1.4rem] bg-[#fffbd6] px-4 py-3">🍔 Cardápio curto para facilitar escolha e operação.</li>
                <li className="rounded-[1.4rem] bg-[#fffbd6] px-4 py-3">🥩 Foco em carnes selecionadas, brioche e montagem artesanal.</li>
                <li className="rounded-[1.4rem] bg-[#fffbd6] px-4 py-3">📍 Projeto especial da house Cuiabar em Campinas.</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurguerCuiabarPage;
