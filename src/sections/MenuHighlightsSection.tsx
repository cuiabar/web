import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { menuHighlights } from '../data/content';

export const MenuHighlightsSection = () => (
  <section className="container-shell py-12">
    <div className="card p-6 sm:p-8">
      <SectionHeading
        eyebrow="Pedidos Online"
        title="Peça rápido e receba com qualidade em Campinas"
        description="Cardápio pensado para manter sabor e apresentação do restaurante até a sua casa."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {menuHighlights.map((item) => (
          <article key={item.name} className="overflow-hidden rounded-2xl border border-sand/50 bg-white">
            <img src={item.image} alt={item.name} loading="lazy" className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs uppercase tracking-wider text-terracotta">{item.category}</p>
              <h3 className="mt-1 font-heading text-2xl">{item.name}</h3>
              <p className="mt-2 text-sm text-steel">{item.description}</p>
              <p className="mt-3 font-semibold text-cocoa">{item.price}</p>
            </div>
          </article>
        ))}
      </div>
      <Link to="/pedidos-online" className="btn-primary mt-8">Ir para pedidos online</Link>
    </div>
  </section>
);
