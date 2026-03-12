import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { SectionHeading } from '../components/SectionHeading';
import { menuSectionEmojis, menuSections, menuSectionsWithImages } from '../data/menu';
import type { MenuSection } from '../data/types';
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

const menuSectionGroups: Array<{
  id: string;
  label: string;
  emoji: string;
  description: string;
  sectionNames: string[];
}> = [
  {
    id: 'porcoes',
    label: 'Porções',
    emoji: '🍟',
    description: 'Petiscos, entradas, fritos, lanches e opções para compartilhar.',
    sectionNames: [
      'Abertura de Trabalhos',
      'Os Queridinhos da Cozinha',
      'Fritinhos do Amor',
      'Pastéis',
      'Lanches',
      'Iscas Supremas',
    ],
  },
  {
    id: 'pratos',
    label: 'Pratos',
    emoji: '🍽️',
    description: 'Executivos, família, massas, saladas e complementos da casa.',
    sectionNames: [
      'Fogão Cuiabano',
      'AMORAO PRIMEIRO QUEIJO',
      'Pra quem troca o pão por paixão',
      'PRATOS FAMÍLIA',
      'PRAS CRIANÇAS',
      'Saladas Frescas',
      'Complementos',
    ],
  },
  {
    id: 'bebidas',
    label: 'Bebidas',
    emoji: '🍹',
    description: 'Cervejas, drinks, refrescos, chopp e clássicos para acompanhar.',
    sectionNames: ['CERVEJAS 600ml', 'REFRESCOS', "LONG NECK'S 330ML", 'ESPECIAL', 'Drinks Clássicos', 'Caipirinha', 'Chopp'],
  },
];

const sectionsByName = new Map(menuSections.map((section) => [section.name, section]));

const groupedMenuSections = menuSectionGroups.map((group) => ({
  ...group,
  sections: group.sectionNames
    .map((sectionName) => sectionsByName.get(sectionName))
    .filter((section): section is MenuSection => Boolean(section)),
}));

const MenuPage = () => {
  useSeo({
    title: 'Menu | Villa Cuiabar | Campinas',
    description: 'Cardápio completo do Villa Cuiabar com petiscos, pratos, drinks, cervejas, saladas e complementos.',
  });

  return (
    <section className="container-shell space-y-10 py-14">
      <Reveal as="header" className="card p-8">
        <SectionHeading
          eyebrow="Menu 2025"
          title="Cardápio completo do Villa Cuiabar, agora dentro do site"
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
      </Reveal>

      <Reveal as="nav" delay={80} className="card p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">Ir direto para a seção</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {groupedMenuSections.map((group) => (
            <a
              key={group.id}
              href={`#${group.id}`}
              className="rounded-full border border-sand/70 bg-white px-4 py-2 text-sm text-cocoa transition hover:border-terracotta hover:text-terracotta"
            >
              <span className="mr-2">{group.emoji}</span>
              {group.label}
            </a>
          ))}
        </div>
      </Reveal>

      <div className="space-y-6">
        {groupedMenuSections.map((group, groupIndex) => (
          <Reveal key={group.id} as="section" id={group.id} delay={groupIndex * 90} className="space-y-6 scroll-mt-28">
            <div className="card p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">{group.emoji} Categoria</p>
              <h2 className="mt-2 font-heading text-4xl text-cocoa sm:text-5xl">{group.label}</h2>
              <p className="mt-3 max-w-3xl text-steel">{group.description}</p>
            </div>

            {group.sections.map((section) => {
              const showImages = menuSectionsWithImages.has(section.name);

              return (
                <section key={section.name} id={slugify(section.name)} className="card p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-3xl">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-terracotta">
                        {menuSectionEmojis[section.name] ?? '🍽️'} Seção
                      </p>
                      <h3 className="mt-2 font-heading text-3xl text-cocoa sm:text-4xl">{section.name}</h3>
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
                                <h4 className="font-heading text-2xl text-cocoa">{item.name}</h4>
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
                              className="media-lift h-16 w-16 rounded-2xl border border-sand/50 object-cover sm:h-20 sm:w-20"
                            />
                          ) : null}
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default MenuPage;
