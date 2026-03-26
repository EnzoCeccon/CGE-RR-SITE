const strategicSupport = [
  'Gabinete',
  'Secretaria',
  'Consultoria T\u00E9cnica',
  'Assessoria',
]

const departments = [
  'Departamento de Transpar\u00EAncia e Controle Social',
  'Departamento de Conv\u00EAnios e Repasse de Recursos',
  'Departamento de Integridade e Governan\u00E7a',
  'Departamento de Contas e Programas de Governo',
  'Departamento de An\u00E1lise Pr\u00E9via e Gest\u00E3o de Riscos',
  'Departamento de Auditorias Programadas',
]

const nuclei = [
  'N\u00FAcleo de Administra\u00E7\u00E3o',
  'N\u00FAcleo de Inform\u00E1tica',
  'N\u00FAcleo de Or\u00E7amento e Finan\u00E7as',
]

export default function Organograma() {
  return (
    <div className="container page organogram-page">
      <section className="organogram-section" aria-labelledby="organograma-page-title">
        <div className="organogram-heading">
          <span className="structure-kicker">Institucional</span>
          <h1 id="organograma-page-title">Organograma</h1>
        </div>

        <div className="organogram-board">
          <div className="organogram-board-title">Controladoria Geral do Estado de Roraima</div>

          <div className="organogram-stack">
            <article className="organogram-node organogram-node-chief">
              <h2>Controlador Geral</h2>
            </article>
            <span className="organogram-line organogram-line-vertical" aria-hidden="true" />
            <article className="organogram-node organogram-node-chief">
              <h2>Controlador-Geral Adjunto</h2>
            </article>
          </div>

          <div className="organogram-group">
            <span className="organogram-line organogram-line-vertical" aria-hidden="true" />
            <span className="organogram-line organogram-line-horizontal" aria-hidden="true" />
            <div className="organogram-grid organogram-grid-support">
              {strategicSupport.map((item) => (
                <article key={item} className="organogram-node organogram-node-support">
                  <h2>{item}</h2>
                </article>
              ))}
            </div>
          </div>

          <div className="organogram-group organogram-group-departments">
            <span className="organogram-line organogram-line-horizontal" aria-hidden="true" />
            <div className="organogram-grid organogram-grid-departments">
              {departments.map((item) => (
                <article key={item} className="organogram-node organogram-node-department">
                  <h2>{item}</h2>
                </article>
              ))}
            </div>
          </div>

          <div className="organogram-stack organogram-stack-middle">
            <span className="organogram-line organogram-line-vertical" aria-hidden="true" />
            <article className="organogram-node organogram-node-admin">
              <h2>Unidade Gestora de Atividades Meio</h2>
            </article>
          </div>

          <div className="organogram-group organogram-group-nuclei">
            <span className="organogram-line organogram-line-vertical" aria-hidden="true" />
            <span className="organogram-line organogram-line-horizontal organogram-line-horizontal-small" aria-hidden="true" />
            <div className="organogram-grid organogram-grid-nuclei">
              {nuclei.map((item) => (
                <article key={item} className="organogram-node organogram-node-admin">
                  <h2>{item}</h2>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
