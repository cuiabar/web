type GoogleCalendarEmbedProps = {
  src: string;
  title?: string;
  description?: string;
};

export const GoogleCalendarEmbed = ({ src, title, description }: GoogleCalendarEmbedProps) => (
  <section className="card p-6 sm:p-8">
    {title ? <h3 className="font-heading text-2xl text-cocoa">{title}</h3> : null}
    {description ? <p className="mt-2 text-steel">{description}</p> : null}
    <div className="mt-6 overflow-hidden rounded-2xl border border-sand/50">
      <div className="relative h-0 w-full pb-[70%] md:pb-[50%]">
        <iframe
          src={src}
          className="absolute inset-0 h-full w-full"
          title="Agenda de shows Cuiabar"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  </section>
);
