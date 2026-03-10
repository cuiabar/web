import type { BlogPost, FaqItem, Feature, MenuHighlight, Testimonial } from './types';

export const differentiators: Feature[] = [
  { title: 'Comida brasileira', description: 'Sabores regionais com execução refinada.', icon: '🍛' },
  { title: 'Delivery eficiente', description: 'Receba rápido com qualidade e segurança.', icon: '🛵' },
  { title: 'Música ao vivo', description: 'Agenda semanal com artistas locais e nacionais.', icon: '🎵' },
  { title: 'Ambiente familiar', description: 'Conforto para encontros, aniversários e celebrações.', icon: '👨‍👩‍👧‍👦' },
  { title: 'Reservas facilitadas', description: 'Garanta sua mesa em poucos cliques.', icon: '📅' },
  { title: 'Operação corporativa', description: 'ProRefeição para empresas com SLA e escala.', icon: '🏢' },
];

export const menuHighlights: MenuHighlight[] = [
  {
    name: 'Jantinha Executiva',
    category: 'Prato executivo',
    description: 'Arroz, feijão, farofa da casa, vinagrete e proteína do dia.',
    price: 'R$ 39,90',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Costela Cuiabar',
    category: 'Especial da casa',
    description: 'Costela bovina assada lentamente com mandioca cremosa.',
    price: 'R$ 64,90',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Linguiça Cuiabana',
    category: 'Petisco',
    description: 'Linguiça artesanal com queijo coalho e chimichurri brasileiro.',
    price: 'R$ 48,90',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Parmegiana de Frango',
    category: 'Clássico',
    description: 'Filé empanado, molho caseiro e queijo gratinado no ponto.',
    price: 'R$ 52,90',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Onde comer comida brasileira em Campinas: guia local',
    excerpt: 'Descubra sabores autênticos e pratos imperdíveis para uma experiência regional completa.',
    category: 'Comida Brasileira',
    readTime: '6 min',
    date: '2026-01-12',
    image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=900&q=80',
    slug: 'onde-comer-comida-brasileira-em-campinas',
  },
  {
    id: '2',
    title: 'Música ao vivo em Campinas: noites para curtir no Cuiabar',
    excerpt: 'Veja como combinar gastronomia e música ao vivo em uma noite memorável.',
    category: 'Música ao Vivo',
    readTime: '4 min',
    date: '2026-01-20',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
    slug: 'musica-ao-vivo-em-campinas-no-cuiabar',
  },
  {
    id: '3',
    title: 'Delivery em Campinas: como manter qualidade até sua mesa',
    excerpt: 'Entenda os cuidados do Cuiabar para garantir sabor, temperatura e apresentação no delivery.',
    category: 'Delivery',
    readTime: '5 min',
    date: '2026-02-02',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=900&q=80',
    slug: 'delivery-em-campinas-com-qualidade',
  },
  {
    id: '4',
    title: 'Refeição corporativa em Campinas: benefícios para sua empresa',
    excerpt: 'Conheça o ProRefeição e veja como simplificar a alimentação do seu time.',
    category: 'ProRefeição',
    readTime: '7 min',
    date: '2026-02-14',
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=900&q=80',
    slug: 'refeicao-corporativa-em-campinas',
  },
];

export const reservationFaqs: FaqItem[] = [
  {
    question: 'Posso reservar para aniversários e grupos grandes?',
    answer: 'Sim. Temos atendimento especial para aniversários, confraternizações e grupos corporativos.',
  },
  {
    question: 'Qual o prazo ideal para reservar?',
    answer: 'Recomendamos reserva com 24h de antecedência, principalmente para noites com música ao vivo.',
  },
  {
    question: 'A reserva garante mesa próxima ao palco?',
    answer: 'Fazemos o possível para atender preferências, conforme disponibilidade no momento da confirmação.',
  },
];

export const testimonials: Testimonial[] = [
  {
    name: 'Mariana Costa',
    role: 'Cliente frequente',
    quote: 'Ambiente impecável, atendimento acolhedor e comida brasileira com apresentação de alto nível.',
  },
  {
    name: 'Rafael Tavares',
    role: 'Gestor de RH',
    quote: 'O ProRefeição elevou a experiência do nosso time: pontualidade, padrão e suporte excelente.',
  },
  {
    name: 'Camila Souza',
    role: 'Empresária',
    quote: 'Melhor opção de música ao vivo em Campinas para quem quer jantar com conforto e estilo.',
  },
];

export const proBenefits = [
  'Cardápios personalizados por perfil de equipe',
  'Processo de contratação simples e acompanhamento dedicado',
  'Escala para eventos, operações recorrentes e ações corporativas',
  'Relatórios e previsibilidade para gestão financeira',
];
