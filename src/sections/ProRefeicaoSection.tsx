import { Link } from 'react-router-dom';

export const ProRefeicaoSection = () => (
  <section className="container-shell py-12">
    <div className="grid gap-6 rounded-card bg-cocoa p-8 text-white lg:grid-cols-2">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-gold">Operação corporativa</p>
        <h2 className="mt-3 font-heading text-4xl">ProRefeição: refeição corporativa em Campinas com padrão profissional</h2>
      </div>
      <div>
        <p className="text-white/80">
          Estrutura para empresas que precisam de alimentação confiável para equipes, eventos e operações recorrentes.
          Processo consultivo, cardápios personalizados e suporte dedicado.
        </p>
        <Link to="/prorefeicao" className="btn-primary mt-6">Conhecer ProRefeição</Link>
      </div>
    </div>
  </section>
);
