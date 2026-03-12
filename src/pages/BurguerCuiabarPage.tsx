import { Reveal } from '../components/Reveal';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const serviceHighlights = [
  {
    title: 'Nova frente do Cuiabar',
    description: 'Uma página pensada para apresentar o Burguer Cuiabar com cara própria, linguagem direta e apelo de lançamento.',
    color: '#fffbd6',
  },
  {
    title: 'Pedido mais rápido',
    description: 'CTA forte para quem quer sair da curiosidade e ir direto para o pedido ou atendimento.',
    color: '#fcf2d0',
  },
  {
    title: 'Visual mais memorável',
    description: 'Landing com contraste forte, grid de produto e cards arredondados para destacar o novo serviço.',
    color: '#e4aec1',
  },
];

const valueBlocks = [
  {
    title: 'Marca própria',
    description: 'O Burguer Cuiabar entra no site com identidade visual dedicada e presença de lançamento, sem parecer só mais um cardápio.',
  },
  {
    title: 'Leitura rápida',
    description: 'Blocos curtos, visual forte e navegação objetiva para o cliente entender o serviço em poucos segundos.',
  },
  {
    title: 'Canal de ação',
    description: 'A página empurra para pedido e contato com botão de destaque no topo do site e CTAs distribuídos ao longo da landing.',
  },
];

const experiencePoints = [
  'Linguagem visual mais quente, direta e jovem para o novo serviço.',
  'Hero com composição de produto em destaque e cards inspirados em landing de software.',
  'Paleta dedicada para diferenciar o Burguer Cuiabar do restante do site sem quebrar a marca.',
  'Página pronta para virar vitrine de lançamento, combos, promoções e campanhas futuras.',
];

const channels = [
  { label: 'Pedir no site', href: siteConfig.orderLinks.direct },
  { label: 'Pedir no iFood', href: siteConfig.orderLinks.ifood },
  { label: 'Falar no WhatsApp', href: `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Quero conhecer o Burguer Cuiabar.')}` },
];

const BurguerCuiabarPage = () => {
  useSeo({
    title: 'Burguer Cuiabar | Villa Cuiabar | Campinas',
    description: 'Conheça o Burguer Cuiabar, nova frente do Cuiabar com landing própria, identidade forte e CTA direto para pedido.',
  });

  return (
    <section className="overflow-hidden bg-[#fffbd6] text-[#511215]">
      <div className="container-shell space-y-12 py-14">
        <Reveal
          as="header"
          className="overflow-hidden rounded-[2.5rem] border border-[#e4aec1]/70 bg-[linear-gradient(135deg,#fcf2d0_0%,#fffbd6_40%,#e4aec1_100%)] p-6 shadow-[0_40px_100px_-48px_rgba(81,18,21,0.55)] sm:p-8 lg:p-10"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.98fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-[#ea533d]/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#ea533d]">
                Novo serviço
              </div>
              <div>
                <h1 className="max-w-3xl font-heading text-5xl leading-[0.98] text-[#511215] sm:text-6xl lg:text-[5.4rem]">
                  Burguer Cuiabar com landing própria e presença de lançamento.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#511215]/78 sm:text-lg">
                  Uma página nova para destacar o serviço, dar mais personalidade ao produto e conduzir o visitante direto para pedido,
                  campanha ou atendimento com o visual mais forte do site.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.orderLinks.direct}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#ea533d] px-7 py-3 text-sm font-semibold text-white shadow-[0_22px_42px_-24px_rgba(234,83,61,0.95)] transition hover:-translate-y-0.5 hover:bg-[#511215]"
                >
                  Pedir Burguer Cuiabar
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Quero conhecer o Burguer Cuiabar.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#511215]/15 bg-white/65 px-7 py-3 text-sm font-semibold text-[#511215] transition hover:-translate-y-0.5 hover:border-[#511215] hover:bg-[#511215] hover:text-white"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>

            <div className="relative min-h-[460px]">
              <div className="absolute -left-10 top-10 h-44 w-44 rounded-full bg-[#e4aec1]/55 blur-3xl" />
              <div className="absolute right-0 top-0 h-52 w-52 rounded-full bg-[#ea533d]/25 blur-3xl" />
              <Reveal delay={120} className="absolute left-0 top-10 w-[58%] rounded-[2rem] border border-white/70 bg-white/80 p-3 shadow-[0_24px_70px_-36px_rgba(81,18,21,0.52)]">
                <img src="/burguer/hero-burguer.jpg" alt="Burger em destaque" loading="eager" className="h-64 w-full rounded-[1.4rem] object-cover" />
              </Reveal>
              <Reveal delay={200} className="absolute right-0 top-0 w-[46%] rounded-[1.8rem] border border-[#ea533d]/15 bg-[#511215] p-5 text-white shadow-[0_28px_70px_-40px_rgba(81,18,21,0.88)]">
                <p className="text-xs uppercase tracking-[0.24em] text-[#e4aec1]">Destaque</p>
                <h2 className="mt-3 font-heading text-3xl leading-tight">Página feita para vender lançamento, campanha e nova linha.</h2>
                <p className="mt-4 text-sm leading-relaxed text-white/78">
                  Layout de vitrine com blocos fortes, contraste alto e CTA de conversão já no primeiro scroll.
                </p>
              </Reveal>
              <Reveal delay={260} className="absolute bottom-0 right-8 w-[66%] rounded-[2rem] border border-[#32835d]/15 bg-[#fcf2d0] p-3 shadow-[0_28px_70px_-40px_rgba(50,131,93,0.52)]">
                <img src="/burguer/combo-burguer.jpg" alt="Burger e acompanhamento" loading="lazy" className="h-56 w-full rounded-[1.5rem] object-cover" />
                <div className="mt-4 flex items-center justify-between gap-4 rounded-[1.4rem] bg-white/65 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#32835d]">Botão em destaque</p>
                    <p className="mt-1 text-sm text-[#511215]/78">A navegação do site já aponta para o novo serviço.</p>
                  </div>
                  <div className="rounded-full bg-[#32835d] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    Ativo
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {serviceHighlights.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              delay={index * 80}
              className="rounded-[2rem] border border-[#511215]/10 p-6 shadow-[0_24px_70px_-44px_rgba(81,18,21,0.34)]"
              style={{ backgroundColor: item.color }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ea533d]">{item.title}</p>
              <p className="mt-4 text-base leading-relaxed text-[#511215]/80">{item.description}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal as="section" className="rounded-[2.25rem] border border-[#511215]/10 bg-white/70 p-8 shadow-[0_28px_80px_-46px_rgba(81,18,21,0.36)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ea533d]">Direção visual</p>
            <h2 className="mt-3 font-heading text-4xl text-[#511215] sm:text-5xl">Uma landing de produto dentro do ecossistema do Cuiabar</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#511215]/78">
              A composição segue a lógica da referência que você mandou: hero em grid, blocos de valor com contraste alto, cards
              arredondados, hierarquia clara e CTA dominante. A diferença é que tudo foi trazido para uma linguagem gastronômica,
              usando a paleta do Burguer Cuiabar.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {experiencePoints.map((point) => (
                <div key={point} className="rounded-[1.5rem] border border-[#e4aec1]/50 bg-[#fcf2d0]/70 px-4 py-4 text-sm leading-relaxed text-[#511215]">
                  {point}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            as="section"
            delay={120}
            className="overflow-hidden rounded-[2.25rem] border border-[#ea533d]/15 bg-[linear-gradient(145deg,#511215_0%,#7c2024_100%)] p-8 text-white shadow-[0_32px_90px_-46px_rgba(81,18,21,0.82)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#e4aec1]">Canais de ação</p>
            <h2 className="mt-3 font-heading text-4xl text-white">A página já nasce pronta para converter</h2>
            <div className="mt-6 space-y-3">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/8 px-5 py-4 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/14"
                >
                  <span>{channel.label}</span>
                  <span className="text-[#e4aec1]">Abrir</span>
                </a>
              ))}
            </div>
            <div className="mt-6 rounded-[1.6rem] bg-white/10 px-5 py-5 text-sm leading-relaxed text-white/80">
              Se você quiser, no próximo passo eu posso transformar essa mesma página em campanha permanente com combos, ofertas,
              horários e cardápio dedicado do Burguer Cuiabar.
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {valueBlocks.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              delay={index * 70}
              className="rounded-[2rem] border border-[#511215]/10 bg-white/75 p-6 shadow-[0_22px_64px_-42px_rgba(81,18,21,0.32)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#32835d]">{item.title}</p>
              <h3 className="mt-3 font-heading text-3xl text-[#511215]">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#511215]/78">{item.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="section"
          delay={200}
          className="overflow-hidden rounded-[2.5rem] border border-[#ea533d]/20 bg-[linear-gradient(135deg,#ea533d_0%,#511215_100%)] p-8 text-white shadow-[0_36px_90px_-46px_rgba(81,18,21,0.78)]"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#fffbd6]">Burguer Cuiabar</p>
              <h2 className="mt-3 font-heading text-4xl text-white sm:text-5xl">Botão destacado, landing ativa e serviço pronto para ganhar campanha.</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/82">
                O novo serviço já ficou separado do restante do site com visual próprio, CTA forte e caminho claro para pedido.
              </p>
            </div>
            <a
              href={siteConfig.orderLinks.direct}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#fffbd6] px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-[#511215] transition hover:-translate-y-0.5 hover:bg-white"
            >
              Abrir Burguer Cuiabar
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default BurguerCuiabarPage;
