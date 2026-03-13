const principal = {
  name: 'MANOEL DANTAS DIAS',
  role: 'CONTROLADOR-GERAL DO ESTADO \u2013 CGE/RR',
}

const adjunct = {
  name: 'NEDRA SAMAI CARVALHO DE LIMA',
  role: 'CONTROLADORA-GERAL ADJUNTA \u2013 CGE/RR',
}

const departments = [
  {
    name: 'DHONNY DA SILVA SANTOS',
    role: 'CHEFE DE GABINETE',
  },
  {
    name: 'LARISSA DE SOUZA LAGO',
    role: 'DIRETORA DE DEPT\u00BA DE AN\u00C1LISE DE CONV\u00CANIOS E REPASSES DE RECURSOS',
  },
  {
    name: 'LAURIANE MICHEIZA ROSA NOGUEIRA',
    role: 'DIRETORA DE DEPT\u00BA DE AUDITORIAS PROGRAMADAS',
  },
  {
    name: 'JO\u00C3O HEBERT PEREIRA CAMACHO',
    role: 'DIRETOR DE DEPT\u00BA DE AN\u00C1LISE PR\u00C9VIA E GEST\u00C3O DE RISCOS',
  },
  {
    name: 'SHEYLA RODRIGUES NETO DIAS DA SILVA',
    role: 'DIRETORA DE DEPT\u00BA DE TRANSPAR\u00CANCIA E CONTROLE SOCIAL',
  },
]

const support = [
  {
    name: 'KARINA MARQUES SANTIAGO',
    role: 'GESTORA DE ATIVIDADE MEIO',
  },
  {
    name: 'IU\u00C7ARA PINHEIRO DE SOUSA',
    role: 'GERENTE DO N\u00DACLEO DE OR\u00C7AMENTO E FINAN\u00C7AS',
  },
  {
    name: 'JULIANA MONTEIRO DOS SANTOS',
    role: 'GERENTE DO N\u00DACLEO DE INFORM\u00C1TICA',
  },
  {
    name: 'KELLY CRISTINA PAIVA JONES',
    role: 'CONSULTORA T\u00C9CNICA',
  },
  {
    name: 'MARIA JULIETE MEDEIROS DE OLIVEIRA',
    role: 'CONSULTORA T\u00C9CNICA',
  },
]

function OrgCard({
  name,
  role,
  tone = 'base',
}: {
  name: string
  role: string
  tone?: 'principal' | 'adjunct' | 'base'
}) {
  return (
    <article className={`org-card org-card-${tone}`}>
      <h2>{name}</h2>
      <p>{role}</p>
    </article>
  )
}

export default function EstruturaFuncional() {
  return (
    <div className="container page structure-page">
      <div className="structure-hero">
        <div>
          <h1>Estrutura Funcional</h1>
          <p className="structure-intro">
            {'Organograma institucional da Controladoria-Geral do Estado de Roraima, com a disposi\u00E7\u00E3o da alta gest\u00E3o, diretorias e apoio t\u00E9cnico-administrativo.'}
          </p>
        </div>
        <div className="structure-badge">CGE/RR</div>
      </div>

      <section className="org-chart" aria-labelledby="organograma-title">
        <div className="structure-section-head">
          <span className="structure-kicker">{'Organiza\u00E7\u00E3o institucional'}</span>
          <h2 id="organograma-title">Organograma funcional</h2>
        </div>

        <div className="org-level org-level-principal">
          <OrgCard name={principal.name} role={principal.role} tone="principal" />
        </div>

        <div className="org-link org-link-main" aria-hidden="true" />

        <div className="org-level org-level-adjunct">
          <OrgCard name={adjunct.name} role={adjunct.role} tone="adjunct" />
        </div>

        <div className="org-branch" aria-hidden="true">
          <span className="org-branch-vertical" />
          <span className="org-branch-horizontal" />
        </div>

        <div className="org-columns">
          <section className="org-group" aria-labelledby="diretorias-title">
            <div className="org-group-head">
              <span className="org-group-label">Diretorias e gabinete</span>
            </div>
            <div className="org-grid">
              {departments.map((person) => (
                <OrgCard key={person.name} name={person.name} role={person.role} />
              ))}
            </div>
          </section>

          <section className="org-group" aria-labelledby="apoio-title">
            <div className="org-group-head">
              <span className="org-group-label">Apoio interno</span>
            </div>
            <div className="org-grid">
              {support.map((person) => (
                <OrgCard key={person.name} name={person.name} role={person.role} />
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
