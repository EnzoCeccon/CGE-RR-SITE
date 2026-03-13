export default function Contato() {
  return (
    <div className="container page contact-page">
      <h1>Contato</h1>

      <section className="contact-box" aria-labelledby="contate-nos">
        <div className="contact-box-head">
          <span className="contact-kicker">Atendimento institucional</span>
          <p>
            Entre em contato com a Controladoria-Geral do Estado de Roraima pelos canais
            oficiais de atendimento.
          </p>
        </div>

        <div className="contact-grid">
          <article className="contact-card">
            <h3>Horário de atendimento</h3>
            <p>7:30h às 13:30hs</p>
          </article>

          <article className="contact-card">
            <h3>E-mails</h3>
            <p>gabinete@cge.rr.gov.br</p>
            <p>transparencia@transparencia.rr.gov.br</p>
          </article>

          <article className="contact-card contact-card-full">
            <h3>Endereço</h3>
            <p>Av. Ville Roy, 4788 - Aparecida, Boa Vista - RR, 69306-405</p>
          </article>
        </div>
      </section>
    </div>
  )
}
