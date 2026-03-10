import type { NavItem } from './types';

export const siteConfig = {
  brandName: 'Cuiabar Restaurante',
  city: 'Campinas',
  whatsappNumber: '5519999999999',
  whatsappMessage: 'Olá! Quero falar com o Cuiabar Restaurante.',
  calendarEmbedUrl:
    'https://calendar.google.com/calendar/embed?src=SEU_CALENDARIO_PUBLICO_AQUI&ctz=America%2FSao_Paulo',
  orderLinks: {
    direct: 'https://pedido.cuiabar.com.br',
    ifood: 'https://www.ifood.com.br',
    food99: 'https://www.99food.com.br',
    whatsapp: 'https://wa.me/5519999999999',
  },
  socialLinks: {
    instagram: 'https://instagram.com/cuiabar',
    facebook: 'https://facebook.com/cuiabar',
    youtube: 'https://youtube.com/@cuiabar',
  },
  address: 'Av. Exemplo, 1234 - Cambuí, Campinas - SP',
  openingHours: [
    'Seg a Qui: 11h às 15h | 18h às 23h',
    'Sex e Sáb: 11h às 00h',
    'Dom: 11h às 17h',
  ],
  email: 'contato@cuiabar.com.br',
  phone: '(19) 3333-0000',
};

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Blog', to: '/blog' },
  { label: 'ProRefeição', to: '/prorefeicao' },
  { label: 'Pedidos Online', to: '/pedidos-online' },
  { label: 'Reservas', to: '/reservas' },
];
