import { GoogleCalendarEmbed } from '../components/GoogleCalendarEmbed';
import { ReservationForm } from '../components/ReservationForm';
import { BlogPreviewSection } from '../sections/BlogPreviewSection';
import { DifferentialsSection } from '../sections/DifferentialsSection';
import { HeroSection } from '../sections/HeroSection';
import { MenuHighlightsSection } from '../sections/MenuHighlightsSection';
import { ProRefeicaoSection } from '../sections/ProRefeicaoSection';
import { TestimonialsSection } from '../sections/TestimonialsSection';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const HomePage = () => {
  useSeo({
    title: 'Cuiabar Restaurante | Restaurante em Campinas com música ao vivo e delivery',
    description:
      'Conheça o Cuiabar Restaurante: comida brasileira em Campinas, delivery rápido, reservas e agenda de música ao vivo.',
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
          description="Acompanhe a programação de música ao vivo em Campinas."
        />
      </section>
      <section className="container-shell py-12">
        <ReservationForm />
      </section>
      <BlogPreviewSection />
      <TestimonialsSection />
    </>
  );
};

export default HomePage;
