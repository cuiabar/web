import { GoogleCalendarEmbed } from '../components/GoogleCalendarEmbed';
import { WhatsAppContactCard } from '../components/WhatsAppContactCard';
import { DifferentialsSection } from '../sections/DifferentialsSection';
import { HeroSection } from '../sections/HeroSection';
import { MenuHighlightsSection } from '../sections/MenuHighlightsSection';
import { ProRefeicaoSection } from '../sections/ProRefeicaoSection';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const HomePage = () => {
  const reservationHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  useSeo({
    title: 'Villa Cuiabar | Campinas',
    description:
      'Delivery no almoço todos os dias, noites com música ao vivo e operação corporativa no Jardim Aurélia, em Campinas.',
  });

  return (
    <>
      <HeroSection />
      <DifferentialsSection />
      <MenuHighlightsSection />
      <ProRefeicaoSection />
      <section className="container-shell py-12">
        <GoogleCalendarEmbed
          src={siteConfig.calendarEmbedUrl}
          title="Agenda de shows"
          description="Acompanhe a programação de música ao vivo da Villa Cuiabar."
        />
      </section>
      <section className="container-shell py-12">
        <WhatsAppContactCard
          title="Reservas e atendimento pelo WhatsApp"
          description="As reservas são feitas diretamente com a equipe pelo WhatsApp. Ideal para mesas, aniversários e dúvidas rápidas."
          href={reservationHref}
          buttonLabel="Reservar no WhatsApp"
          note="Atendimento presencial com música ao vivo às sextas, sábados e domingos."
        />
      </section>
    </>
  );
};

export default HomePage;
