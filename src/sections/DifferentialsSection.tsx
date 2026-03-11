import { differentiators } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';

export const DifferentialsSection = () => (
  <section className="container-shell py-12">
    <SectionHeading
      eyebrow="Diferenciais"
      title="O lugar certo para almoço, happy hour e encontro em família"
      description="Estrutura pensada para atender bem no delivery, no presencial e nas noites com música ao vivo em Campinas."
    />
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {differentiators.map((item) => (
        <article key={item.title} className="card p-5">
          <span className="text-2xl" aria-hidden>{item.icon}</span>
          <h3 className="mt-3 font-heading text-xl">{item.title}</h3>
          <p className="mt-2 text-sm text-steel">{item.description}</p>
        </article>
      ))}
    </div>
  </section>
);
