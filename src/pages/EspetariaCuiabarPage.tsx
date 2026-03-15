import { Reveal } from '../components/Reveal';
import { getRouteSeo } from '../data/seo';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const conceptSignals = [
  '🍢 Boteco raiz brasileiro',
  '🥃 Copo americano ilustrativo',
  '🌿 Clima fresco e acolhedor',
];

const houseMoments = [
  {
    title: 'Mesa comprida',
    description: 'Uma página pensada para transmitir conversa boa, porções para compartilhar e o ritmo descontraído de fim de tarde.',
  },
  {
    title: 'Brasa e balcão',
    description: 'A Espetaria Cuiabar nasce como frente da casa para uma leitura mais direta de boteco brasileiro, sem perder capricho.',
  },
  {
    title: 'Projeto em construção',
    description: 'O cardápio próprio entra na próxima etapa. Enquanto isso, a página já apresenta a identidade e o clima dessa nova frente.',
  },
];

const whatsAppHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent('Olá! Quero saber mais sobre a Espetaria Cuiabar.')}`;

const AmericanCup = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 88 120"
    aria-hidden="true"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 10H70L62 106C61.3 113.2 55.2 118.7 48 118.7H40C32.8 118.7 26.7 113.2 26 106L18 10Z"
      fill="rgba(255,251,232,0.82)"
      stroke="rgba(87,51,18,0.26)"
      strokeWidth="2"
    />
    <path d="M24 26H64" stroke="rgba(87,51,18,0.12)" strokeWidth="2" />
    <path d="M23 42H65" stroke="rgba(87,51,18,0.12)" strokeWidth="2" />
    <path d="M22 58H66" stroke="rgba(87,51,18,0.12)" strokeWidth="2" />
    <path d="M21 74H67" stroke="rgba(87,51,18,0.12)" strokeWidth="2" />
    <path d="M20 90H68" stroke="rgba(87,51,18,0.12)" strokeWidth="2" />
    <path d="M19 106H69" stroke="rgba(87,51,18,0.12)" strokeWidth="2" />
  </svg>
);

const EspetariaCuiabarPage = () => {
  useSeo(getRouteSeo('/espetaria'));

  return (
    <section className="espetaria-page relative overflow-hidden text-[#3d2718]">
      <div className="container-shell relative space-y-10 py-14">
        <Reveal
          as="header"
          className="relative overflow-hidden rounded-[2.7rem] border border-[#6f4b27]/12 bg-[linear-gradient(145deg,rgba(255,248,229,0.97),rgba(246,234,205,0.95))] px-6 py-7 shadow-[0_38px_96px_-54px_rgba(61,39,24,0.36)] sm:px-8 lg:px-10"
        >
          <div className="espetaria-leaf espetaria-leaf-left" aria-hidden="true">
            <span>🌿</span>
            <span>🍃</span>
            <span>🌿</span>
          </div>
          <div className="espetaria-leaf espetaria-leaf-right" aria-hidden="true">
            <span>🍃</span>
            <span>🌿</span>
            <span>🍃</span>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-[1] space-y-6">
              <div className="flex flex-wrap gap-2">
                {conceptSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-[#6f4b27]/10 bg-white/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7b4d1f]"
                  >
                    {signal}
                  </span>
                ))}
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#ab4b22]">Espetaria Cuiabar</p>
                <h1 className="mt-3 max-w-3xl font-heading text-5xl leading-[0.94] text-[#3d2718] sm:text-6xl lg:text-[5.1rem]">
                  Boteco raiz com alma brasileira.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#6a4b34] sm:text-lg">
                  Um novo braço da casa para reunir conversa longa, clima leve, copo americano na mesa e uma leitura mais boêmia do
                  universo Cuiabar.
                </p>
              </div>

              <div className="rounded-[2rem] border border-[#6f4b27]/10 bg-[#fff9ec] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ab4b22]">Projeto da casa</p>
                <p className="mt-3 text-sm leading-relaxed text-[#6a4b34]">
                  A Espetaria Cuiabar está entrando em fase de apresentação. O cardápio próprio ainda está sendo montado, mas a proposta
                  já é clara: encontro, brasilidade, porções para compartilhar e uma atmosfera de boteco bem resolvida.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={whatsAppHref} target="_blank" rel="noreferrer" className="btn-primary !bg-[#ab4b22] hover:!bg-[#3d2718]">
                  Falar sobre a Espetaria
                </a>
                <a href="/menu" className="btn-secondary !border-[#6f4b27]/18 !bg-white/80 !text-[#3d2718] hover:!bg-[#3d2718] hover:!text-white">
                  Ver menu da casa
                </a>
              </div>
            </div>

            <div className="espetaria-stage relative min-h-[420px]">
              <div className="espetaria-glow espetaria-glow-top" aria-hidden="true" />
              <div className="espetaria-glow espetaria-glow-bottom" aria-hidden="true" />

              <Reveal delay={80} className="espetaria-card espetaria-card-main">
                <div className="rounded-[2rem] border border-white/40 bg-[linear-gradient(160deg,rgba(87,51,18,0.96),rgba(38,88,52,0.94))] p-6 text-white shadow-[0_32px_78px_-42px_rgba(61,39,24,0.72)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/66">Clima da página</p>
                  <h2 className="mt-4 font-heading text-4xl leading-none">Mesa, brasa e conversa boa.</h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/80">
                    A direção visual da Espetaria puxa para o boteco brasileiro contemporâneo: acolhedor, regional e sem excessos.
                  </p>

                  <div className="mt-6 flex items-end justify-between gap-4">
                    <div className="flex gap-3">
                      <AmericanCup className="h-24 w-16 opacity-90" />
                      <AmericanCup className="h-20 w-14 translate-y-2 opacity-70" />
                    </div>
                    <span className="rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/86">
                      Copo americano ilustrativo
                    </span>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={160} className="espetaria-card espetaria-card-side">
                <div className="rounded-[1.8rem] border border-[#6f4b27]/10 bg-[#fff9ec]/94 p-5 shadow-[0_30px_70px_-42px_rgba(61,39,24,0.34)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ab4b22]">Morador honorário</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="grid h-16 w-16 place-items-center rounded-[1.5rem] bg-[#f0d4a3] text-4xl shadow-inner">
                      🐕
                    </div>
                    <div>
                      <p className="font-heading text-2xl text-[#3d2718]">Cachorro caramelo</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#6a4b34]">
                        Presença ilustrativa para segurar a pegada popular, brasileira e sem pose da página.
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <Reveal className="rounded-[2.4rem] border border-[#6f4b27]/12 bg-white/76 p-7 shadow-[0_28px_72px_-48px_rgba(61,39,24,0.3)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ab4b22]">Leitura da proposta</p>
            <div className="mt-6 grid gap-4">
              {houseMoments.map((item, index) => (
                <Reveal
                  key={item.title}
                  delay={index * 90}
                  className="rounded-[1.7rem] border border-[#6f4b27]/10 bg-[linear-gradient(180deg,rgba(255,249,236,0.96),rgba(255,255,255,0.9))] px-5 py-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="font-heading text-3xl text-[#3d2718]">{item.title}</h2>
                    <span className="rounded-full bg-[#f6ecd0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#7b4d1f]">
                      Espetaria Cuiabar
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#6a4b34]">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal className="rounded-[2.4rem] border border-[#255834]/16 bg-[linear-gradient(160deg,rgba(38,88,52,0.96),rgba(61,39,24,0.96))] p-8 text-white shadow-[0_34px_88px_-46px_rgba(38,88,52,0.64)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#f4dca8]">O que já dá para fazer</p>
              <h2 className="mt-3 font-heading text-4xl">Acompanhar e chamar a casa.</h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/82">
                <li className="rounded-[1.4rem] border border-white/12 bg-white/8 px-4 py-3">💬 Falar com a equipe e entender o que está vindo para a Espetaria.</li>
                <li className="rounded-[1.4rem] border border-white/12 bg-white/8 px-4 py-3">🍽️ Navegar pelo menu atual da casa enquanto a frente nova é preparada.</li>
                <li className="rounded-[1.4rem] border border-white/12 bg-white/8 px-4 py-3">📍 Manter o Cuiabar no radar como restaurante e ponto de encontro em Campinas.</li>
              </ul>
            </Reveal>

            <Reveal delay={120} className="rounded-[2.4rem] border border-[#6f4b27]/12 bg-[#fff9ec] p-8 shadow-[0_28px_74px_-50px_rgba(61,39,24,0.28)]">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ab4b22]">Pegada visual</p>
              <h2 className="mt-3 font-heading text-4xl text-[#3d2718]">Brasileiro, caloroso e direto.</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#6a4b34]">
                A página foi desenhada com outra atmosfera em relação ao restante do site: menos restaurante executivo, mais esquina boa,
                luz quente, madeira, folhas e boteco bem tratado.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EspetariaCuiabarPage;
