import { WhatsAppContactCard } from '../components/WhatsAppContactCard';
import { Reveal } from '../components/Reveal';
import { reservationFaqs } from '../data/content';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const ReservasPage = () => {
  const reservationHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  useSeo({
    title: 'Reservas | Villa Cuiabar | Campinas',
    description: 'Reservas e atendimento da Villa Cuiabar feitos diretamente pelo WhatsApp.',
  });

  return (
    <section className="container-shell space-y-10 py-14">
      <Reveal as="header" className="card p-8">
        <h1 className="font-heading text-5xl">Reservas na Villa Cuiabar</h1>
        <p className="mt-3 text-steel">
          Todo o atendimento de reservas acontece pelo WhatsApp, com resposta direta da equipe para mesas, aniversários e grupos.
        </p>
      </Reveal>
      <Reveal as="section" delay={80} className="grid gap-8 lg:grid-cols-2">
        <WhatsAppContactCard
          title="Chame a equipe no WhatsApp"
          description="Envie sua mensagem e combine reserva, horário, quantidade de pessoas e qualquer detalhe especial."
          href={reservationHref}
          buttonLabel="Abrir WhatsApp"
          note="Música ao vivo às sextas, sábados e domingos."
        />
        <div className="card p-8">
          <h2 className="font-heading text-3xl">Como funciona</h2>
          <p className="mt-3 text-steel">A equipe confirma disponibilidade, horários e orientações diretamente na conversa.</p>
          <h3 className="mt-6 font-heading text-2xl">Perguntas frequentes</h3>
          <div className="mt-3 space-y-3">
            {reservationFaqs.map((faq) => (
              <article key={faq.question} className="rounded-xl border border-sand/50 bg-white p-4">
                <h4 className="font-semibold">{faq.question}</h4>
                <p className="mt-1 text-sm text-steel">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <a href={reservationHref} target="_blank" rel="noreferrer" className="btn-primary">Reservas rápidas por WhatsApp</a>
      </Reveal>
    </section>
  );
};

export default ReservasPage;
