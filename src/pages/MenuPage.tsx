import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/SectionHeading';
import { menuSectionEmojis, menuSections, menuSectionsWithImages } from '../data/menu';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

const totalItems = menuSections.reduce((sum, section) => sum + section.items.length, 0);

const formatDescription = (value: string) => value.replace(/^"|"$/g, '');

const MenuPage = () => {
  useSeo({
    title: 'Menu | Villa Cuiabar | Campinas',
    description: 'Cardápio completo da Villa Cuiabar com petiscos, pratos, drinks, cervejas, saladas e complementos.',
  });

  return (
    <section className="container-shell space-y-10 py-14">
      <header className="card p-8">
        <SectionHeading
          eyebrow="Menu 2025"
          title="Cardápio completo da Villa Cuiabar, agora dentro do site"
          description="Cópia local do menu com 20 seções e 124 itens, para o cliente consultar tudo sem depender do site antigo."
        />
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={siteConfig.orderLinks.direct} target="_blank" rel="noreferrer" className="btn-primary">
            Pedir no site
          </a>
          <Link to="/pedidos-online" className="btn-secondary">
            Ver canais de pedido
          </Link>
        </div>
        <p className="mt-4 text-sm text-steel">
          {menuSections.length} seções organizadas com {totalItems} itens para almoço, jantar, petiscos, bebidas e complementos.
        </p>
      </header>

      <nav className="card p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">Ir direto para a seção</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {menuSections.map((section) => (
            <a
              key={section.name}
              href={`#${slugify(section.name)}`}
              className="rounded-full border border-sand/70 bg-white px-4 py-2 text-sm text-cocoa transition hover:border-terracotta hover:text-terracotta"
            >
              <span className="mr-2">{menuSectionEmojis[section.name] ?? '🍽️'}</span>
              {section.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="space-y-6">
        {menuSections.map((section) => {
          const showImages = menuSectionsWithImages.has(section.name);

          return (
            <section key={section.name} id={slugify(section.name)} className="card scroll-mt-28 p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">
                    {menuSectionEmojis[section.name] ?? '🍽️'} Seção
                  </p>
                  <h2 className="mt-2 font-heading text-3xl text-cocoa sm:text-4xl">{section.name}</h2>
                  {section.description ? <p className="mt-3 text-steel">{formatDescription(section.description)}</p> : null}
                </div>
                <div className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-cocoa">
                  {section.items.length} itens
                </div>
              </div>

              <div className="mt-8 grid gap-4 xl:grid-cols-2">
                {section.items.map((item) => (
                  <article key={`${section.name}-${item.name}-${item.description}`} className="rounded-3xl border border-sand/50 bg-white p-4 shadow-soft">
                    <div className="flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-heading text-2xl text-cocoa">{item.name}</h3>
                            {item.description ? (
                              <p className="mt-2 text-sm leading-relaxed text-steel">{formatDescription(item.description)}</p>
                            ) : null}
                          </div>
                          {item.price ? <p className="text-sm font-semibold text-terracotta">{item.price}</p> : null}
                        </div>

                        {item.variants.length ? (
                          <ul className="mt-4 space-y-2 text-sm text-steel">
                            {item.variants.map((variant) => (
                              <li key={`${item.name}-${variant.name}`} className="flex items-center justify-between gap-3 rounded-2xl bg-cream/70 px-3 py-2">
                                <span>{variant.name}</span>
                                <span className="font-semibold text-cocoa">{variant.price}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>

                      {showImages && item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="h-16 w-16 rounded-2xl border border-sand/50 object-cover sm:h-20 sm:w-20"
                        />
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
};

export default MenuPage;
