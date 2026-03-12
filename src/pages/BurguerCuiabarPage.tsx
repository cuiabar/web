import { useEffect, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const heroBadges = ['🍔 Burgers', '🍟 Fritas', '🏍️ Delivery', '🥤 Combos'];

const highlightCards = [
  {
    title: 'Burgers e fritas',
    description: 'Uma seleção para quem quer pedir direto, com combinações práticas para o almoço, o jantar ou a fome do fim do dia.',
  },
  {
    title: 'Combos prontos',
    description: 'Burger, acompanhamento e bebida no mesmo fluxo para facilitar a escolha e deixar o pedido mais simples.',
  },
  {
    title: 'Canais oficiais',
    description: 'Peça pelo site, consulte no iFood ou fale com a equipe no WhatsApp, de acordo com o canal que preferir.',
  },
];

const quickSignals = [
  '🍔 Pedido direto no site oficial',
  '🛵 Opção também no iFood',
  '💬 Atendimento no WhatsApp',
  '📍 Villa Cuiabar em Campinas',
];

const serviceBlocks = [
  {
    title: 'Burgers em destaque',
    description: 'Uma seleção pensada para quem quer pedir rápido e acertar no sabor.',
    emoji: '🍔',
  },
  {
    title: 'Fritas e extras',
    description: 'Acompanhamentos que completam o pedido com praticidade.',
    emoji: '🍟',
  },
  {
    title: 'Combos do dia a dia',
    description: 'Opções montadas para facilitar a escolha e entregar um pedido mais completo.',
    emoji: '🥤',
  },
  {
    title: 'Delivery do Villa Cuiabar',
    description: 'Escolha o canal que preferir e fale com a equipe pelos meios oficiais.',
    emoji: '🏍️',
  },
];

const channels = [
  { label: 'Pedir no site', href: siteConfig.burguerOrderLinks.direct, emoji: '🍔' },
  { label: 'Pedir no iFood', href: siteConfig.burguerOrderLinks.ifood, emoji: '🛵' },
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
    description: 'Peça burgers, fritas e combos do Villa Cuiabar pelo site, iFood ou WhatsApp.',
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
    <section className="burger-page relative overflow-hidden bg-[#feddb5] text-[#2e0501]">
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
          className="overflow-hidden rounded-[2.8rem] border border-[#6c4336]/12 bg-[linear-gradient(135deg,#fffbd6_0%,#fcf2d0_44%,#feddb5_100%)] px-6 py-8 shadow-[0_42px_110px_-56px_rgba(46,5,1,0.46)] sm:px-8 lg:px-10 lg:py-10"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[0.94fr_1.06fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-[#6c4336]/12 bg-white/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#b64811]">
                Burguer Cuiabar
              </div>
              <div className="flex flex-wrap gap-2">
                {heroBadges.map((badge) => (
                  <span key={badge} className="rounded-full border border-[#6c4336]/10 bg-white/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#2e0501]">
                    {badge}
                  </span>
                ))}
              </div>
              <div>
                <h1 className="max-w-3xl font-heading text-5xl leading-[0.92] text-[#2e0501] sm:text-6xl lg:text-[5.6rem]">
                  Burguer Cuiabar para pedir sem complicação.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6c4336] sm:text-lg">
                  Hambúrgueres, fritas e combos do Villa Cuiabar com acesso rápido aos canais oficiais de pedido. Escolha o canal que
                  preferir e faça o seu pedido com praticidade.
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
              <div className="grid gap-3 sm:grid-cols-3">
                {quickSignals.slice(0, 3).map((item) => (
                  <div key={item} className="rounded-[1.5rem] border border-[#6c4336]/10 bg-white/74 px-4 py-4 text-sm leading-relaxed text-[#6c4336] shadow-[0_16px_40px_-34px_rgba(46,5,1,0.45)]">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="burger-stage">
              <div className="burger-stage-aura burger-stage-aura-1" />
              <div className="burger-stage-aura burger-stage-aura-2" />

              <Reveal
                delay={100}
                className="absolute left-0 top-10 z-[3] w-[12.5rem] rounded-[1.9rem] border border-white/55 bg-white/82 p-4 shadow-[0_26px_60px_-38px_rgba(46,5,1,0.42)] backdrop-blur sm:w-[14rem]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b64811]">Pedido rápido</p>
                <p className="mt-3 text-sm leading-relaxed text-[#6c4336]">Burgers, fritas e combos em um fluxo simples para escolher e pedir.</p>
              </Reveal>

              <Reveal
                delay={180}
                className="absolute right-3 top-4 z-[1] flex h-[18rem] w-[18rem] items-center justify-center rounded-full border border-white/65 bg-[radial-gradient(circle_at_center,#f98203_0%,#ea533d_46%,#b64811_100%)] shadow-[0_42px_110px_-46px_rgba(182,72,17,0.78)] sm:h-[22rem] sm:w-[22rem]"
              >
                <div className="rounded-full border border-white/45 bg-white/12 p-5 backdrop-blur">
                  <img src="/burguer/hero-burguer.jpg" alt="Hambúrguer do Burguer Cuiabar" loading="eager" className="h-56 w-56 rounded-full object-cover shadow-[0_28px_70px_-30px_rgba(46,5,1,0.55)] sm:h-72 sm:w-72" />
                </div>
              </Reveal>

              <Reveal delay={220} className="burger-center-loader">
                <div className="burger-center-loader-ring" />
                <div className="burger-center-loader-ring burger-center-loader-ring-delay" />
                <div className="burger-center-loader-core">🍔</div>
              </Reveal>

              <Reveal
                delay={280}
                className="absolute bottom-0 right-0 z-[3] w-[14rem] rounded-[2rem] border border-[#6c4336]/10 bg-white/84 p-4 shadow-[0_28px_70px_-42px_rgba(46,5,1,0.52)] backdrop-blur sm:w-[18rem]"
              >
                <img src="/burguer/combo-burguer.jpg" alt="Combo do Burguer Cuiabar com acompanhamento" loading="lazy" className="h-44 w-full rounded-[1.4rem] object-cover sm:h-48" />
                <div className="mt-4 rounded-[1.2rem] bg-[#fffbd6] px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7e8427]">Combos e acompanhamentos</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6c4336]">Pedidos pensados para ficar prontos com praticidade, do burger à frita.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4 lg:grid-cols-3">
          {highlightCards.map((item, index) => (
            <Reveal
              key={item.title}
              as="article"
              delay={index * 90}
              className="rounded-[2rem] border border-[#6c4336]/10 bg-white/78 p-6 shadow-[0_24px_70px_-46px_rgba(46,5,1,0.3)]"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b64811]">{item.title}</p>
              <p className="mt-4 text-base leading-relaxed text-[#6c4336]">{item.description}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
          <Reveal className="rounded-[2.4rem] border border-[#2e0501]/10 bg-[linear-gradient(160deg,#2e0501_0%,#6c4336_52%,#b64811_100%)] p-8 text-white shadow-[0_34px_90px_-46px_rgba(46,5,1,0.78)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#feddb5]">O que você encontra</p>
            <h2 className="mt-3 font-heading text-4xl text-white sm:text-5xl">Uma página focada no pedido, do burger ao combo.</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/82">
              O Burguer Cuiabar reúne os destaques do cardápio em um ambiente direto, com visual mais leve e acesso rápido aos canais
              oficiais do Villa Cuiabar.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {quickSignals.map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-white/12 bg-white/10 px-4 py-4 text-sm leading-relaxed text-white/88">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-[2.4rem] border border-[#d7a55c]/34 bg-[linear-gradient(135deg,#fffbd6_0%,#fcf2d0_54%,#feddb5_100%)] p-8 shadow-[0_30px_80px_-46px_rgba(46,5,1,0.28)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7e8427]">Destaques do Burguer Cuiabar</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {serviceBlocks.map((item, index) => (
                <Reveal
                  key={item.title}
                  as="article"
                  delay={index * 70}
                  className="rounded-[1.8rem] border border-[#e3ba99]/55 bg-white/78 p-5 shadow-[0_18px_50px_-38px_rgba(46,5,1,0.2)]"
                >
                  <div className="text-3xl" aria-hidden>
                    {item.emoji}
                  </div>
                  <h3 className="mt-3 font-heading text-3xl text-[#2e0501]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6c4336]">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal
          as="section"
          delay={180}
          className="overflow-hidden rounded-[2.5rem] border border-[#d7a55c]/26 bg-[linear-gradient(135deg,#fffbd6_0%,#fcf2d0_42%,#feddb5_100%)] p-8 shadow-[0_34px_90px_-46px_rgba(46,5,1,0.34)]"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#b64811]">Peça agora</p>
              <h2 className="mt-3 font-heading text-4xl text-[#2e0501] sm:text-5xl">Escolha o seu canal e faça o pedido.</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#6c4336]">
                Se preferir, fale direto com a equipe no WhatsApp ou siga pelo site e pelo iFood para concluir o pedido com praticidade.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {channels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between gap-4 rounded-full bg-[#2e0501] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_34px_-22px_rgba(46,5,1,0.7)] transition hover:-translate-y-0.5 hover:bg-[#b64811]"
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
