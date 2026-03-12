import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { navItems, siteConfig } from '../data/siteConfig';

const whatsAppHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-sand/40 bg-cream/90 shadow-[0_12px_40px_rgba(51,35,19,0.08)] backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3 text-cocoa">
          <img src={siteConfig.logoUrl} alt="" className="h-12 w-12 rounded-full object-cover transition duration-500 group-hover:rotate-6 group-hover:scale-105" />
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
                className={
                  item.variant === 'highlight'
                    ? 'inline-flex items-center rounded-full bg-[#ea533d] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_34px_-18px_rgba(234,83,61,0.92)] transition hover:-translate-y-0.5 hover:bg-[#511215]'
                    : 'relative text-sm font-medium text-steel transition hover:text-cocoa after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-terracotta after:transition-transform after:duration-300 hover:after:scale-x-100'
                }
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  item.variant === 'highlight'
                    ? `inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_34px_-18px_rgba(234,83,61,0.92)] transition ${isActive ? 'bg-[#511215]' : 'bg-[#ea533d] hover:-translate-y-0.5 hover:bg-[#511215]'}`
                    : `relative text-sm font-medium transition after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-terracotta after:transition-transform after:duration-300 ${isActive ? 'text-terracotta after:scale-x-100' : 'text-steel hover:text-cocoa after:scale-x-0 hover:after:scale-x-100'}`
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
        <button onClick={() => setOpen((s) => !s)} className="rounded-full border border-sand/60 bg-white/80 p-2 text-cocoa transition hover:border-terracotta hover:text-terracotta md:hidden" aria-label="Abrir menu">
          <span className="text-2xl">☰</span>
        </button>
      </div>
      {open ? (
        <div className="panel-rise border-t border-sand/40 bg-white/95 p-4 backdrop-blur md:hidden">
          <div className="container-shell flex flex-col gap-3">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.to}
                  href={item.to}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className={item.variant === 'highlight' ? 'rounded-full bg-[#ea533d] px-4 py-2 text-center font-semibold text-white' : 'text-steel'}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={item.variant === 'highlight' ? 'rounded-full bg-[#ea533d] px-4 py-2 text-center font-semibold text-white' : 'text-steel'}
                >
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
