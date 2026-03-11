import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navItems, siteConfig } from '../data/siteConfig';

const whatsAppHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-sand/40 bg-cream/95 backdrop-blur">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 text-cocoa">
          <img src={siteConfig.logoUrl} alt="" className="h-12 w-12 rounded-full object-cover" />
          <span className="font-heading text-xl leading-none sm:text-2xl">{siteConfig.brandShortName}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            item.external ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-steel transition hover:text-cocoa"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${isActive ? 'text-terracotta' : 'text-steel hover:text-cocoa'}`
                }
              >
                {item.label}
              </NavLink>
            )
          ))}
          <a href={whatsAppHref} className="btn-primary" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </nav>
        <button onClick={() => setOpen((s) => !s)} className="md:hidden" aria-label="Abrir menu">
          <span className="text-2xl">☰</span>
        </button>
      </div>
      {open ? (
        <div className="border-t border-sand/40 bg-white p-4 md:hidden">
          <div className="container-shell flex flex-col gap-3">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.to}
                  href={item.to}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="text-steel"
                >
                  {item.label}
                </a>
              ) : (
                <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="text-steel">
                  {item.label}
                </NavLink>
              )
            ))}
            <a href={whatsAppHref} className="btn-primary text-center" target="_blank" rel="noreferrer">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
};
