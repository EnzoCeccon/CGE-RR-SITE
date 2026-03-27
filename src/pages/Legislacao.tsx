import { useState } from 'react'

type LegislationDocument = {
  title: string
  description: string
  href: string
  embedHref: string
}

const legislationDocuments: LegislationDocument[] = [
  {
    title: 'Regimento Interno da CGE',
    description: 'Decreto n\u00BA 12.524, de 29 de mar\u00E7o de 2011.',
    href: '/legislacao/regimento-interno-cge.pdf',
    embedHref: '/legislacao/regimento-interno-cge.pdf',
  },
]

export default function Legislacao() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [legislationDocuments[0].title]: true,
  })

  const toggleItem = (title: string) => {
    setOpenItems((current) => ({
      ...current,
      [title]: !current[title],
    }))
  }

  return (
    <section className="container page legislation-page">
      <h1 className="legislation-title">{'Legislação'}</h1>
      <p>
        {
          'Consulte aqui leis, decretos, portarias e demais normativos relacionados ao controle interno e à atuação da Controladoria Geral do Estado de Roraima.'
        }
      </p>

      <div className="legislation-grid" style={{ marginTop: '2rem' }}>
        {legislationDocuments.map((item) => {
          const isOpen = !!openItems[item.title]

          return (
            <article key={item.title} className="publication-embed-card legislation-card">
              <div className="publication-embed-head legislation-head">
                <button
                  type="button"
                  className="legislation-toggle"
                  onClick={() => toggleItem(item.title)}
                  aria-expanded={isOpen}
                >
                  <div className="publication-profile">
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                  <span className="legislation-toggle-icon" aria-hidden="true">
                    {isOpen ? 'Fechar' : 'Abrir / Expandir'}
                  </span>
                </button>

                <a href={item.href} target="_blank" rel="noreferrer" className="publication-open-link">
                  Baixar PDF
                </a>
              </div>

              {isOpen && (
                <div className="publication-embed-frame">
                  <iframe src={item.embedHref} title={item.title} loading="lazy" />
                </div>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
