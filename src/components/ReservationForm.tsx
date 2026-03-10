import { useState } from 'react';

type FormValues = {
  name: string;
  whatsapp: string;
  date: string;
  time: string;
  people: string;
  notes: string;
};

const initialState: FormValues = { name: '', whatsapp: '', date: '', time: '', people: '', notes: '' };

export const ReservationForm = () => {
  const [values, setValues] = useState<FormValues>(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!values.name || !values.whatsapp || !values.date || !values.time || !values.people) {
      setError('Preencha os campos obrigatórios para enviar sua solicitação de reserva.');
      return;
    }

    setSuccess('Solicitação registrada! Em breve nossa equipe confirma sua reserva pelo WhatsApp.');
    setValues(initialState);
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8" noValidate>
      <h3 className="font-heading text-2xl text-cocoa">Reservas para restaurante em Campinas</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: 'Nome*', key: 'name', type: 'text' },
          { label: 'WhatsApp*', key: 'whatsapp', type: 'tel' },
          { label: 'Data*', key: 'date', type: 'date' },
          { label: 'Horário*', key: 'time', type: 'time' },
          { label: 'Pessoas*', key: 'people', type: 'number' },
        ].map((field) => (
          <label key={field.key} className="text-sm font-medium text-steel">
            {field.label}
            <input
              required
              type={field.type}
              min={field.key === 'people' ? 1 : undefined}
              className="mt-1 w-full rounded-xl border border-sand bg-white px-3 py-2 text-cocoa outline-none ring-terracotta focus:ring"
              value={values[field.key as keyof FormValues]}
              onChange={(event) =>
                setValues((previous) => ({ ...previous, [field.key]: event.target.value }))
              }
            />
          </label>
        ))}
      </div>
      <label className="block text-sm font-medium text-steel">
        Observações
        <textarea
          rows={4}
          className="mt-1 w-full rounded-xl border border-sand bg-white px-3 py-2 text-cocoa outline-none ring-terracotta focus:ring"
          value={values.notes}
          onChange={(event) => setValues((previous) => ({ ...previous, notes: event.target.value }))}
        />
      </label>
      {error ? <p className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      {success ? <p className="rounded-lg bg-green-100 px-3 py-2 text-sm text-green-700">{success}</p> : null}
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Enviar solicitação
      </button>
    </form>
  );
};
