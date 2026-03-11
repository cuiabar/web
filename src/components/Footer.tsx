import { navItems, siteConfig } from '../data/siteConfig';

const whatsappHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export const Footer = () => (
  <footer className="mt-20 bg-cocoa py-12 text-white">
    <div className="container-shell grid gap-8 md:grid-cols-4">
      <div>
        <div className="flex items-center gap-3">
          <img src={siteConfig.logoUrl} alt="" className="h-12 w-12 rounded-full object-cover" />
          <h3 className="font-heading text-2xl">{siteConfig.brandShortName}</h3>
        </div>
        <p className="mt-3 text-sm text-white/80">
          Delivery todos os dias no almoço, atendimento presencial com música ao vivo e operação corporativa em Campinas.
        </p>
      </div>
      <div>
        <h4 className="font-semibold">Links rápidos</h4>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          {navItems.map((item) => (
            <li key={item.to}>
              <a href={item.to} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Contato</h4>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          <li>{siteConfig.phone}</li>
          <li>{siteConfig.email}</li>
          <li>{siteConfig.address}</li>
          <li>
            <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>
          <li>
            <a href={siteConfig.socialLinks.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold">Horários</h4>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          {siteConfig.openingHours.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full bg-terracotta px-4 py-2 text-sm font-semibold">
          Falar no WhatsApp
        </a>
      </div>
    </div>
    <div className="container-shell mt-8 border-t border-white/20 pt-4 text-xs text-white/70">
      © {new Date().getFullYear()} {siteConfig.brandName}. Todos os direitos reservados.
    </div>
  </footer>
);
