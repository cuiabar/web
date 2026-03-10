import { ReservationForm } from '../components/ReservationForm';
import { reservationFaqs } from '../data/content';
import { siteConfig } from '../data/siteConfig';
import { useSeo } from '../hooks/useSeo';

const ReservasPage = () => {
  useSeo({
    title: 'Reservas | Reserve sua mesa no Cuiabar Restaurante em Campinas',
    description: 'Faça reservas para restaurante em Campinas com música ao vivo, aniversários e ocasiões especiais.',
  });

  return (
    <section className="container-shell space-y-10 py-14">
      <header className="card p-8">
        <h1 className="font-heading text-5xl">Reserve sua mesa no Cuiabar</h1>
        <p className="mt-3 text-steel">Ideal para encontros em família, datas especiais, aniversários e reservas de grupos em Campinas.</p>
      </header>
      <section className="grid gap-8 lg:grid-cols-2">
        <ReservationForm />
        <div className="card p-8">
          <h2 className="font-heading text-3xl">Como funciona</h2>
          <p className="mt-3 text-steel">Após enviar o formulário, nossa equipe confirma a disponibilidade e envia orientações pelo WhatsApp.</p>
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
      </section>
      <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noreferrer" className="btn-primary">Reservas rápidas por WhatsApp</a>
    </section>
  );
};

export default ReservasPage;
