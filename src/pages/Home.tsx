import { useEffect, useState } from 'react'

export default function Home() {
  const banners = [
    {
      title: 'Cursos e conteúdos sobre Controle Interno',
      description: 'Espaço para campanhas, avisos institucionais e destaques do portal (formato “slider”).',
    },
    {
      title: 'Transparência e Governança',
      description:
        'Acompanhe indicadores, relatórios e informações estratégicas que fortalecem o controle interno.',
    },
    {
      title: 'Portal da Controladoria',
      description: 'Central de acesso a normas, orientações, publicações e canais de comunicação com a CGE.',
    },
  ]

  const news = [
    {
      title: 'ultimas noticias atualizadas',
      date: '15/09/2025',
      comments: 'Nenhum comentário',
    },
    {
      title: 'ultimas noticias atualizadas',
      date: '19/05/2025',
      comments: 'Nenhum comentário',
    },
    {
      title: 'ultimas noticias atualizadas',
      date: '08/04/2025',
      comments: 'Nenhum comentário',
    },
  ]

  const publications = [
    {
      title: 'Publicação em destaque 01',
      embedHref: 'https://www.instagram.com/reel/DVn1sOEEUO-/embed',
      href: 'https://www.instagram.com/reel/DVn1sOEEUO-/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      title: 'Publicação em destaque 02',
      embedHref: 'https://www.instagram.com/reel/DQcrSFQkafx/embed',
      href: 'https://www.instagram.com/reel/DQcrSFQkafx/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
    {
      title: 'Publicação em destaque 03',
      embedHref: 'https://www.instagram.com/reel/DPWwGkvEXK6/embed',
      href: 'https://www.instagram.com/reel/DPWwGkvEXK6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    },
  ]

  const [currentBanner, setCurrentBanner] = useState(0)
  const [currentNews, setCurrentNews] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 8000)
    return () => clearInterval(id)
  }, [banners.length])

  const handlePrevNews = () => {
    setCurrentNews((prev) => (prev - 1 + news.length) % news.length)
  }

  const handleNextNews = () => {
    setCurrentNews((prev) => (prev + 1) % news.length)
  }

  return (
    <div>
      <section className="banner" aria-label="Banner principal">
        <div className="banner-frame">
          <div className="banner-text">
            <h1>{banners[currentBanner].title}</h1>
            <p>{banners[currentBanner].description}</p>
          </div>
          <div className="banner-dots" aria-hidden="true">
            {banners.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`dot ${index === currentBanner ? 'active' : ''}`}
                onClick={() => setCurrentBanner(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="portal-search" aria-label="Pesquisar no Portal de Transparência">
        <div className="container portal-search-inner">
          <input
            className="portal-search-input"
            placeholder="Pesquisar dentro do Portal de Transparência"
          />
          <button type="button" className="portal-search-button">
            Buscar
          </button>
        </div>
      </section>

      <section className="container site-main" aria-label="Últimas notícias">
        <h2 className="section-title">Últimas Notícias</h2>

        <div className="news-carousel">
          <button
            type="button"
            className="news-arrow left"
            onClick={handlePrevNews}
            aria-label="Notícia anterior"
          >
            ‹
          </button>

          <div className="news-window">
            <div
              className="news-track"
              style={{ transform: `translateX(-${currentNews * 100}%)` }}
            >
              {news.map((item) => (
                <article key={item.title} className="news-card">
                  <div className="news-card-top">
                    <div className="news-logo" aria-hidden="true" />
                  </div>
                  <div className="news-card-body">
                    <div className="news-title">{item.title}</div>
                    <div className="news-meta">
                      <span>📅 {item.date}</span>
                      <span>💬 {item.comments}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="news-arrow right"
            onClick={handleNextNews}
            aria-label="Próxima notícia"
          >
            ›
          </button>
        </div>

        <div className="news-dots" aria-hidden="true">
          {news.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`news-dot ${index === currentNews ? 'active' : ''}`}
              onClick={() => setCurrentNews(index)}
            />
          ))}
        </div>
      </section>

      <section className="fixed-banner" aria-label="Acesso ao Portal de Transparência">
        <div className="container">
          <div className="fixed-banner-inner">
            <div>
              <h2>Acesso ao Portal de Transparência</h2>
              <p>
                Consulte dados, relatórios, contratos, despesas e demais informações públicas, em conformidade com a
                Lei de Acesso à Informação.
              </p>
            </div>
            <button type="button" className="fixed-banner-button">
              Acesso ao Portal de Transparência
            </button>
          </div>
        </div>
      </section>

      <section className="container services-section" aria-label="Canais de atendimento">
        <div className="services-header">
          <h2>Canais da Ouvidoria e Controle</h2>
          <p>
            Escolha o tipo de manifestação que melhor descreve sua necessidade. Cada canal possui um fluxo próprio
            para garantir o tratamento adequado.
          </p>
        </div>

        <div className="services-grid">
          {[
            {
              icon: '📣',
              title: 'Denúncia',
              description:
                'Comunique uma irregularidade ou ato ilícito relacionado à administração pública.',
            },
            {
              icon: '💡',
              title: 'Sugestão',
              description: 'Envie uma ideia ou proposta de melhoria para os serviços públicos.',
            },
            {
              icon: '👍',
              title: 'Elogio',
              description:
                'Registre o reconhecimento por um atendimento de qualidade ou boa prática.',
            },
            {
              icon: '👎',
              title: 'Reclamação',
              description:
                'Manifeste sua insatisfação com um serviço público ou atendimento recebido.',
            },
            {
              icon: '💬',
              title: 'Solicitação',
              description: 'Peça informações, providências ou serviços específicos ao órgão.',
            },
            {
              icon: '🧩',
              title: 'Simplifique',
              description:
                'Sugira formas de desburocratizar e tornar os serviços públicos mais simples.',
            },
          ].map((item) => (
            <article key={item.title} className="service-card">
              <div className="service-icon" aria-hidden="true">
                <span>{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button type="button" className="service-button">
                Clique aqui
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="container publications-section" aria-label="Publicações em destaque">
        <div className="publications-header">
          <h2>Publicações em destaque</h2>
          <p>
            Acesse relatórios, guias e materiais técnicos produzidos pela Controladoria para apoiar a transparência e
            a boa gestão pública.
          </p>
        </div>

        <div className="publications-grid">
          {publications.map((item) => (
            <article key={item.title} className="publication-embed-card">
              <div className="publication-embed-head">
                <div className="publication-profile">
                  <strong>cge.roraima</strong>
                  <span>Instagram oficial</span>
                </div>
                <a href={item.href} target="_blank" rel="noreferrer" className="publication-open-link">
                  Ver no Instagram
                </a>
              </div>
              <div className="publication-embed-frame">
                <iframe
                  title={item.title}
                  src={item.embedHref}
                  loading="lazy"
                  allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
