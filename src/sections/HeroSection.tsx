import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

const whatsAppHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export const HeroSection = () => (
  <section className="container-shell grid items-center gap-8 py-14 lg:grid-cols-2 lg:py-20">
    <div>
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">Villa Cuiabar em Campinas</p>
      <h1 className="font-heading text-4xl leading-tight text-cocoa sm:text-5xl">
        Delivery forte no almoço, noites com música ao vivo e comida brasileira de verdade.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-steel">
        A Villa Cuiabar combina pratos bem servidos, espaço familiar, bar completo e atendimento próximo para quem quer comer bem no Jardim Aurélia.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="btn-primary" to="/menu">Ver menu</Link>
        <a className="btn-secondary" href={whatsAppHref} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
      </div>
    </div>
    <div className="card overflow-hidden p-3">
      <img
        src="https://static.wixstatic.com/media/f30eee_6de0ddcd8445473086c6f3a90f1abb1e~mv2.png"
        alt="Prato servido na Villa Cuiabar"
        loading="eager"
        className="h-[420px] w-full rounded-2xl object-cover"
      />
    </div>
  </section>
);
