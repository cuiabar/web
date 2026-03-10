import { navItems, siteConfig } from '../data/siteConfig';

const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export const Footer = () => (
  <footer className="mt-20 bg-cocoa py-12 text-white">
    <div className="container-shell grid gap-8 md:grid-cols-4">
      <div>
        <h3 className="font-heading text-2xl">Cuiabar Restaurante</h3>
        <p className="mt-3 text-sm text-white/80">Comida brasileira em Campinas com delivery, reservas e música ao vivo.</p>
      </div>
      <div>
        <h4 className="font-semibold">Links rápidos</h4>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          {navItems.map((item) => (
            <li key={item.to}><a href={item.to}>{item.label}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Contato</h4>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          <li>{siteConfig.phone}</li>
          <li>{siteConfig.email}</li>
          <li>{siteConfig.address}</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Horários</h4>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          {siteConfig.openingHours.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-terracotta px-4 py-2 text-sm font-semibold">
          Reservar pelo WhatsApp
        </a>
      </div>
    </div>
    <div className="container-shell mt-8 border-t border-white/20 pt-4 text-xs text-white/70">
      © {new Date().getFullYear()} Cuiabar Restaurante. Todos os direitos reservados.
    </div>
  </footer>
);
