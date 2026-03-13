import { siteConfig } from './siteConfig';

const ADDRESS_LABEL = siteConfig.address;
const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Av.%20Brigadeiro%20Rafael%20Tobias%20de%20Aguiar%2C%201121%20-%20Jardim%20Aurelia%20-%20Campinas%2FSP';
const JOBS_URL = '/vagas';
const LIVE_MUSIC_SCHEDULE_HOURS = [
  'Sexta, sabado e domingo',
  'Consulte a programacao atual antes de sair',
];

export const linksPageConfig = {
  brandName: 'Cuiabar',
  pageEyebrow: 'Links oficiais',
  headline: 'Escolha seu proximo passo com a Cuiabar.',
  subheadline: 'Delivery, atendimento, novidades e oportunidades em um so lugar.',
  institutionalIntro:
    'Uma pagina leve, direta e oficial para chegar rapido ao que importa na marca em Campinas.',
  featuredChannelLabel: 'Canal em destaque',
  featuredChannelNote: 'Receba promocoes, agenda, novidades da casa e avisos importantes em primeira mao.',
  whatsappChannelUrl: 'https://whatsapp.com/channel/0029VbAcHLXFSAsxCt6lly0a',
  restaurantWhatsappUrl: 'https://wa.me/551933058878',
  directOrderUrl: 'https://expresso.cuiabar.com',
  jobsUrl: JOBS_URL,
  addressLabel: ADDRESS_LABEL,
  mapsUrl: MAPS_URL,
  liveMusicScheduleTitle: 'Presencial com musica ao vivo',
  liveMusicScheduleText: 'Presencial com musica ao vivo - consulte a programacao atual.',
  liveMusicScheduleHours: LIVE_MUSIC_SCHEDULE_HOURS,
  venueCopy:
    'Venha viver a experiencia Cuiabar no salao, com ambiente acolhedor, operacao familiar e programacao musical.',
  footerCopy: 'Cuiabar • Campinas/SP',
  logoUrl: siteConfig.logoUrl,
  links: [
    {
      id: 'channel',
      emoji: '📣',
      eyebrow: 'Novidades',
      title: 'Entrar no canal do WhatsApp',
      subtitle: 'Promocoes, avisos, eventos e atualizacoes oficiais.',
      href: 'https://whatsapp.com/channel/0029VbAcHLXFSAsxCt6lly0a',
      isFeatured: true,
    },
    {
      id: 'restaurant-whatsapp',
      emoji: '💬',
      eyebrow: 'Atendimento',
      title: 'Falar com o restaurante',
      subtitle: 'Contato direto com a equipe pelo WhatsApp.',
      href: 'https://wa.me/551933058878',
      isFeatured: false,
    },
    {
      id: 'direct-order',
      emoji: '🍽️',
      eyebrow: 'Pedido',
      title: 'Fazer pedido direto',
      subtitle: 'Acesse o canal oficial de pedidos online.',
      href: 'https://expresso.cuiabar.com',
      isFeatured: false,
    },
    {
      id: 'live-music',
      emoji: '🎶',
      eyebrow: 'Presencial',
      title: 'Ver programacao presencial com musica',
      subtitle: 'Confira o bloco com a agenda e a experiencia no salao.',
      href: '#presencial',
      isFeatured: false,
    },
    {
      id: 'jobs',
      emoji: '👩‍🍳',
      eyebrow: 'Oportunidades',
      title: 'Trabalhe com a gente',
      subtitle: 'Veja vagas abertas e envie sua candidatura.',
      href: JOBS_URL,
      isFeatured: false,
    },
    {
      id: 'maps',
      emoji: '📍',
      eyebrow: 'Localizacao',
      title: 'Como chegar',
      subtitle: 'Abra o endereco no Google Maps.',
      href: MAPS_URL,
      isFeatured: false,
    },
  ],
} as const;
