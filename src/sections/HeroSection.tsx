import { Link } from 'react-router-dom';

export const HeroSection = () => (
  <section className="container-shell grid items-center gap-8 py-14 lg:grid-cols-2 lg:py-20">
    <div>
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">Restaurante em Campinas</p>
      <h1 className="font-heading text-4xl leading-tight text-cocoa sm:text-5xl">
        Comida brasileira premium com música ao vivo, delivery e reservas.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-steel">
        O Cuiabar combina identidade regional, ambiente acolhedor e operação ágil para transformar cada visita em uma experiência memorável.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn-primary" to="/pedidos-online">Pedir online</Link>
        <Link className="btn-secondary" to="/reservas">Reservar mesa</Link>
      </div>
    </div>
    <div className="card overflow-hidden p-3">
      <img
        src="https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=1200&q=80"
        alt="Ambiente premium com pratos brasileiros"
        loading="eager"
        className="h-[420px] w-full rounded-2xl object-cover"
      />
    </div>
  </section>
);
