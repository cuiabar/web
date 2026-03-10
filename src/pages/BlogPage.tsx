import { useMemo, useState } from 'react';
import { blogPosts } from '../data/content';
import { useSeo } from '../hooks/useSeo';

const categories = ['Todos', ...Array.from(new Set(blogPosts.map((post) => post.category)))];

const BlogPage = () => {
  useSeo({
    title: 'Blog Cuiabar | Comida brasileira, delivery e música ao vivo em Campinas',
    description: 'Conteúdos SEO do Cuiabar sobre restaurante em Campinas, reservas, delivery e refeição corporativa.',
  });

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');

  const filteredPosts = useMemo(
    () =>
      blogPosts.filter((post) => {
        const searchMatch = post.title.toLowerCase().includes(search.toLowerCase());
        const categoryMatch = category === 'Todos' || post.category === category;
        return searchMatch && categoryMatch;
      }),
    [search, category],
  );

  return (
    <section className="container-shell py-14">
      <h1 className="font-heading text-4xl">Blog do Cuiabar</h1>
      <p className="mt-3 text-steel">Estrutura pronta para escalar conteúdos e SEO local para Campinas.</p>
      <div className="mt-6 grid gap-4 rounded-card border border-sand/50 bg-white p-4 md:grid-cols-[2fr,1fr]">
        <input
          placeholder="Buscar artigo"
          className="rounded-xl border border-sand px-3 py-2"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select className="rounded-xl border border-sand px-3 py-2" value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <article key={post.id} className="card overflow-hidden">
            <img src={post.image} alt={post.title} loading="lazy" className="h-52 w-full object-cover" />
            <div className="p-5">
              <p className="text-xs uppercase tracking-wide text-terracotta">{post.category} · {post.readTime}</p>
              <h2 className="mt-2 font-heading text-3xl">{post.title}</h2>
              <p className="mt-2 text-steel">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-2">
        <button className="btn-secondary">1</button>
        <button className="btn-secondary">2</button>
        <button className="btn-secondary">3</button>
      </div>
    </section>
  );
};

export default BlogPage;
