import { WhatsAppContactCard } from '../components/WhatsAppContactCard';
import { Reveal } from '../components/Reveal';
import { proBenefits } from '../data/content';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const ProRefeicaoPage = () => {
  const commercialHref = `https://wa.me/${siteConfig.commercialWhatsappNumber}?text=${encodeURIComponent(siteConfig.commercialWhatsappMessage)}`;

  useSeo({
    title: 'ProRefeição | Villa Cuiabar | Campinas',
    description: 'Refeições profissionais para empresas, escritórios, clínicas, obras e operações recorrentes em Campinas.',
  });

  return (
    <section className="container-shell space-y-10 py-14">
      <Reveal as="header" className="card p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-terracotta">B2B</p>
        <h1 className="mt-3 font-heading text-5xl">ProRefeição para empresas que precisam de padrão, volume e pontualidade</h1>
        <p className="mt-4 max-w-3xl text-steel">
          Refeições profissionais para escritórios, clínicas, hospitais, indústrias, obras, construtoras e operações recorrentes em Campinas.
        </p>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {proBenefits.map((item, index) => (
          <Reveal key={item} as="article" delay={index * 70} className="card p-6">{item}</Reveal>
        ))}
      </div>
      <Reveal as="section" delay={120} className="card p-8">
        <h2 className="font-heading text-3xl">Fluxo de contratação</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-steel">
          <li>Entendimento do volume, rotina e perfil da operação.</li>
          <li>Definição do cardápio e formato de atendimento.</li>
          <li>Execução com acompanhamento próximo e atendimento comercial dedicado.</li>
        </ol>
      </Reveal>
      <Reveal delay={160}>
        <WhatsAppContactCard
          title="Fale com o comercial do ProRefeição"
          description="Use o WhatsApp da Villa Cuiabar para tirar dúvidas, pedir orçamento e iniciar um projeto corporativo."
          href={commercialHref}
          buttonLabel="Chamar no WhatsApp"
          note="Atendimento via WhatsApp oficial da Villa Cuiabar."
        />
      </Reveal>
    </section>
  );
};

export default ProRefeicaoPage;
