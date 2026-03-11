import { Link } from 'react-router-dom';
import { menuHighlights } from '../data/content';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const channels = [
  { name: 'Site próprio', link: siteConfig.orderLinks.direct },
  { name: 'iFood', link: siteConfig.orderLinks.ifood },
  { name: '99Food', link: siteConfig.orderLinks.food99 },
  { name: 'WhatsApp', link: siteConfig.orderLinks.whatsapp },
];

const PedidosOnlinePage = () => {
  useSeo({
    title: 'Pedidos Online | Villa Cuiabar | Campinas',
    description: 'Faça seu pedido na Villa Cuiabar pelos canais oficiais de delivery.',
  });

  return (
    <section className="container-shell space-y-10 py-14">
      <header className="card p-8">
        <h1 className="font-heading text-5xl">Delivery em Campinas para pedir do seu jeito</h1>
        <p className="mt-3 text-steel">Peça pelo canal que preferir e confira o cardápio completo da Villa Cuiabar.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {channels.map((channel) => (
          <a key={channel.name} href={channel.link} target="_blank" rel="noreferrer" className="card p-8 transition hover:-translate-y-1">
            <h2 className="font-heading text-3xl">{channel.name}</h2>
            <p className="mt-2 text-steel">Acessar canal de pedidos</p>
          </a>
        ))}
      </div>
      <section>
        <h2 className="font-heading text-3xl">Mais vendidos</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {menuHighlights.map((item) => (
            <article key={item.name} className="card overflow-hidden">
              <img src={item.image} alt={item.name} loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-heading text-2xl">{item.name}</h3>
                <p className="text-steel">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
        <Link to={siteConfig.menuPageUrl} className="btn-secondary mt-6 inline-flex">
          Abrir menu completo
        </Link>
      </section>
    </section>
  );
};

export default PedidosOnlinePage;
