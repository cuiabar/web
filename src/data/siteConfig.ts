import type { NavItem } from './types';

export const siteConfig = {
  brandName: 'Villa Cuiabar | Campinas',
  brandShortName: 'Villa Cuiabar',
  city: 'Campinas',
  logoUrl: '/logo-villa-cuiabar.png',
  burguerBrandName: 'Burger Cuiabar',
  burguerLogoUrl: '/burguer/logo-burger-cuiabar-transparent.png',
  whatsappNumber: '551933058878',
  whatsappMessage: 'Olá, tudo bem?',
  whatsappChannelUrl: 'https://whatsapp.com/channel/0029VbAcHLXFSAsxCt6lly0a',
  commercialWhatsappNumber: '551933058878',
  commercialWhatsappMessage: 'Olá! Quero falar com o time do ProRefeição.',
  calendarEmbedUrl:
    'https://calendar.google.com/calendar/embed?src=c_cb44b5a5c24377de0d7ec7a6bb840f4ed667ce355c9b4611a4b9d9e1ff7e5782%40group.calendar.google.com&ctz=America%2FSao_Paulo',
  orderLinks: {
    direct: 'https://expresso.cuiabar.com',
    ifood:
      'https://www.ifood.com.br/delivery/campinas-sp/villa-cuiabar--executivos--pratos-do-dia-jardim-aurelia/1af0e396-a7c8-46e1-b1a5-dd06486bb4ad',
    food99: 'https://oia.99app.com/dlp9/C94oJv?area=BR',
    whatsapp: 'https://wa.me/551933058878?text=Ol%C3%A1%2C%20tudo%20bem%3F',
  },
  burguerOrderLinks: {
    direct: 'https://expresso.cuiabar.com',
    ifood:
      'https://www.ifood.com.br/delivery/campinas-sp/burger-cuiabar----picanha-smash-vila-proost-de-souza/14734c59-f45a-41e2-80b0-f1914971f6e1?utm_medium=share',
  },
  menuPageUrl: '/menu',
  prorefeicaoPageUrl: 'https://www.cuiabar.com/prorefeicao',
  socialLinks: {
    instagram: 'https://instagram.com/cuiabar',
    facebook: 'https://facebook.com/villacuiabar',
  },
  address: 'Av. Brigadeiro Rafael Tobias de Aguiar, 1121 - Jardim Aurélia - Campinas/SP',
  openingHours: [
    'Delivery no almoço todos os dias',
    'Delivery à noite de quarta a sábado',
    'Presencial com música ao vivo às sextas, sábados e domingos',
  ],
  email: 'cuiabar@cuiabar.net',
  phone: '(19) 3305-8878',
};

export const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  { label: 'Espetaria', to: '/espetaria' },
  { label: 'Burguer Cuiabar', to: '/burguer', variant: 'highlight' },
  { label: 'ProRefeição', to: '/prorefeicao' },
  { label: 'Reservas', to: '/reservas' },
  { label: 'Vagas', to: '/vagas' },
];
