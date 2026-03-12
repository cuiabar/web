import { useEffect, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const heroBadges = ['🍔 Burgers', '🍟 Fritas', '🏍️ Delivery', '🥤 Combos'];

const launchHighlights = [
  {
    title: 'Linha própria',
    description: 'O Burguer Cuiabar entra com energia própria dentro do ecossistema do Cuiabar: mais impacto, mais apelo e mais velocidade de decisão.',
  },
  {
    title: 'Pedido sem enrolação',
    description: 'A página foi reescrita para levar o cliente ao clique com mais urgência, leitura curta e CTA dominando o fluxo.',
  },
  {
    title: 'Campanha viva',
    description: 'Estrutura pronta para receber combos, cupons, smash da semana, promoções-relâmpago e viradas de cardápio.',
  },
];

const menuSignals = [
  'Página feita para vender burger, frita e combo com mais desejo imediato',
  'Visual agressivo para lançamento, anúncios e tráfego pago',
  'Leitura curta e movimento forte para gerar ação mais rápido',
  'Base pronta para crescer com promoções, banners e novos sabores',
];

const serviceBlocks = [
  {
    title: 'Burger no centro',
    description: 'A comunicação coloca o hambúrguer como protagonista absoluto, sem dividir atenção com o restante do site.',
    emoji: '🍔',
  },
  {
    title: 'Frita como extra',
    description: 'Acompanhamentos entram como reforço de desejo e oportunidade natural de aumento de ticket médio.',
    emoji: '🍟',
  },
  {
    title: 'Delivery em alta',
    description: 'A página foi empurrada para o pedido rápido, com clima de urgência e cara de delivery ativo.',
    emoji: '🏍️',
  },
  {
    title: 'Combos de ataque',
    description: 'Blocos preparados para destacar promoções, ofertas do dia e campanhas com visual de vitrine.',
    emoji: '🥤',
  },
];

const channels = [
  { label: 'Pedir no site', href: siteConfig.orderLinks.direct, emoji: '🍔' },
  { label: 'Pedir no iFood', href: siteConfig.orderLinks.ifood, emoji: '🛵' },
  {
    label: 'Falar no WhatsApp',
    href: `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Quero pedir no Burguer Cuiabar.')}`,
    emoji: '💬',
  },
];

const floatingEmojis = [
  { emoji: '🍔', className: 'burger-float burger-float-1' },
  { emoji: '🍟', className: 'burger-float burger-float-2' },
  { emoji: '🏍️', className: 'burger-float burger-float-3' },
  { emoji: '🥪', className: 'burger-float burger-float-4' },
  { emoji: '🥤', className: 'burger-float burger-float-5' },
  { emoji: '🧀', className: 'burger-float burger-float-6' },
  { emoji: '🍔', className: 'burger-float burger-float-7' },
  { emoji: '🍟', className: 'burger-float burger-float-8' },
];

const BurguerCuiabarPage = () => {
  const [showLoader, setShowLoader] = useState(true);

  useSeo({
    title: 'Burguer Cuiabar | Villa Cuiabar | Campinas',
    description: 'Conheça o Burguer Cuiabar em cuiabar.com/burguer e peça burgers, fritas e combos com uma landing própria do serviço.',
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowLoader(false);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, 1300);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <section className="burger-page relative overflow-hidden bg-[#fffbd6] text-[#511215]">
      {showLoader ? (
        <div className="burger-loader">
          <div className="burger-loader-core">
            <span className="burger-loader-rings" />
            <span className="burger-loader-rings burger-loader-rings-delay" />
            <span className="burger-loader-icon">🍔</span>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floatingEmojis.map((item) => (
          <span key={item.className} className={item.className} aria-hidden>
            {item.emoji}
          </span>
        ))}
      </div>

      <div className="container-shell relative space-y-12 py-14">
        <Reveal
          as="header"
          className="overflow-hidden rounded-[2.6rem] border border-[#ea533d]/30 bg-[radial-gradient(circle_at_top_left,#fffbd6_0%,#fcf2d0_28%,#e4aec1_60%,#ea533d_100%)] px-6 py-8 shadow-[0_42px_110px_-50px_rgba(81,18,21,0.65)] sm:px-8 lg:px-10 lg:py-10"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[0.96fr_1.04fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-[#511215]/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#ea533d]">
                Burguer Cuiabar
              </div>
              <div className="flex flex-wrap gap-2">
                {heroBadges.map((badge) => (
                  <span key={badge} className="rounded-full border border-[#511215]/10 bg-white/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#511215]">
                    {badge}
                  </span>
                ))}
              </div>
              <div>
                <h1 className="max-w-3xl font-heading text-5xl leading-[0.92] text-[#511215] sm:text-6xl lg:text-[5.8rem]">
                  O lado mais quente, rápido e agressivo do Cuiabar agora vive em `/burguer`.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#511215]/80 sm:text-lg">
                  Burgers, fritas, combos e delivery com uma landing própria, linguagem mais incisiva e uma experiência visual feita
                  para chamar clique, gerar desejo e empurrar o cliente para o pedido.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={siteConfig.orderLinks.direct}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-[#ea533d] px-7 py-3 text-sm font-semibold text-white shadow-[0_24px_48px_-26px_rgba(234,83,61,0.98)] transition hover:-translate-y-1 hover:bg-[#511215]"
                >
                  Pedir agora no Burguer Cuiabar
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Quero pedir no Burguer Cuiabar.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-[#511215]/14 bg-white/68 px-7 py-3 text-sm font-semibold text-[#511215] transition hover:-translate-y-1 hover:border-[#511215] hover:bg-[#511215] hover:text-white"
                >
                  Chamar no WhatsApp
                </a>
              </div>
            </div>

            <div className="burger-stage">
              <div className="burger-stage-aura burger-stage-aura-1" />
              <div className="burger-stage-aura burger-stage-aura-2" />

              <Reveal delay={120} className="burger-card burger-card-left">
                <img src="/burguer/combo-burguer.jpg" alt="Combo de hambúrguer e acompanhamento" loading="lazy" className="h-52 w-full rounded-[1.6rem] object-cover sm:h-60" />
              </Reveal>

              <Reveal delay={180} className="burger-center-loader">
                <div className="burger-center-loader-ring" />
                <div className="burger-center-loader-ring burger-center-loader-ring-delay" />
                <div className="burger-center-loader-core">🍔</div>
              </Reveal>

              <Reveal delay={260} className="burger-card burger-card-right">
                <img src="/burguer/hero-burguer.jpg" alt="Hambúrguer em destaque" loading="eager" className="h-60 w-full rounded-[1.8rem] object-cover sm:h-72" />
                <div className="mt-4 rounded-[1.3rem] bg-white/72 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ea533d]">Apontamento novo</p>
                  <p className="mt-2 text-sm text-[#511215]/78">O caminho oficial do serviço agora é `cuiabar.com/burguer`.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {launchHighlights.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              delay={index * 90}
              className="rounded-[2rem] border border-[#511215]/10 bg-white/78 p-6 shadow-[0_24px_70px_-46px_rgba(81,18,21,0.36)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ea533d]">{item.title}</p>
              <p className="mt-4 text-base leading-relaxed text-[#511215]/80">{item.description}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.98fr_1.02fr]">
          <Reveal className="rounded-[2.3rem] border border-[#511215]/10 bg-[linear-gradient(145deg,#511215_0%,#6f1a20_58%,#ea533d_100%)] p-8 text-white shadow-[0_34px_90px_-46px_rgba(81,18,21,0.88)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#fffbd6]">Entrega visual</p>
            <h2 className="mt-3 font-heading text-4xl text-white sm:text-5xl">Movimento alto, leitura curta e vontade imediata de clicar.</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/82">
              A página foi redesenhada para parecer campanha viva: loader central de hambúrguer, emojis flutuando, fundo em tensão
              cromática e blocos de produto que entram já com sensação de velocidade.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {menuSignals.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-4 text-sm leading-relaxed text-white/86">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-[2.3rem] border border-[#ea533d]/22 bg-[#fcf2d0] p-8 shadow-[0_30px_80px_-46px_rgba(81,18,21,0.34)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#32835d]">O que esta página comunica</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {serviceBlocks.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="article"
                  delay={index * 70}
                  className="rounded-[1.8rem] border border-[#e4aec1]/55 bg-white/72 p-5 shadow-[0_18px_50px_-38px_rgba(81,18,21,0.28)]"
                >
                  <div className="text-3xl" aria-hidden>
                    {item.emoji}
                  </div>
                  <h3 className="mt-3 font-heading text-3xl text-[#511215]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#511215]/78">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal
          as="section"
          delay={180}
          className="overflow-hidden rounded-[2.4rem] border border-[#ea533d]/18 bg-[linear-gradient(135deg,#fffbd6_0%,#fcf2d0_44%,#e4aec1_100%)] p-8 shadow-[0_34px_90px_-46px_rgba(81,18,21,0.42)]"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#ea533d]">Burguer Cuiabar em ação</p>
              <h2 className="mt-3 font-heading text-4xl text-[#511215] sm:text-5xl">A rota oficial agora é `cuiabar.com/burguer`.</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#511215]/80">
                O botão do header já foi atualizado para esse caminho. Mantive compatibilidade com a rota antiga para não quebrar links
                que já tenham sido compartilhados.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between gap-4 rounded-full bg-[#511215] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_-22px_rgba(81,18,21,0.76)] transition hover:-translate-y-0.5 hover:bg-[#ea533d]"
                >
                  <span>{channel.emoji}</span>
                  <span>{channel.label}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default BurguerCuiabarPage;
