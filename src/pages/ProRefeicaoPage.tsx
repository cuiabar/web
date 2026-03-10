import { ReservationForm } from '../components/ReservationForm';
import { proBenefits } from '../data/content';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const ProRefeicaoPage = () => {
  useSeo({
    title: 'ProRefeição | Refeição corporativa em Campinas',
    description: 'Operação corporativa do Cuiabar para empresas: refeições com padrão, escala e atendimento consultivo.',
  });

  return (
    <section className="container-shell space-y-10 py-14">
      <header className="card p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-terracotta">B2B</p>
        <h1 className="mt-3 font-heading text-5xl">ProRefeição para empresas que exigem eficiência e sabor</h1>
        <p className="mt-4 max-w-3xl text-steel">Solução de refeição corporativa em Campinas para equipes operacionais, escritórios, eventos e ações internas.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {proBenefits.map((item) => (
          <article key={item} className="card p-6">{item}</article>
        ))}
      </div>
      <section className="card p-8">
        <h2 className="font-heading text-3xl">Fluxo de contratação</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6 text-steel">
          <li>Diagnóstico da demanda e perfil de consumo.</li>
          <li>Proposta comercial com cardápio e operação.</li>
          <li>Implementação assistida e acompanhamento contínuo.</li>
        </ol>
      </section>
      <ReservationForm />
      <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" className="btn-primary">Falar com time comercial no WhatsApp</a>
    </section>
  );
};

export default ProRefeicaoPage;
