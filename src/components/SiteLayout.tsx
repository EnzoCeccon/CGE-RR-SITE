import { NavLink, Outlet } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'

type MenuKey = 'institucional' | 'servicos' | null

export default function SiteLayout() {
  const [open, setOpen] = useState<MenuKey>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSection, setMobileSection] = useState<MenuKey>(null)
  const headerRef = useRef<HTMLElement | null>(null)

  const menus = useMemo(
    () => ({
      institucional: [
        { to: '/institucional/quem-somos', label: 'Quem somos' },
        { to: '/institucional/missao-visao-valores', label: 'Missão, visão e valores' },
      ],
      servicos: [
        { to: '/servicos/orientacoes', label: 'Orientações e normativos' },
        { to: '/servicos/relatorios', label: 'Relatórios e publicações' },
      ],
    }),
    [],
  )

  useEffect(() => {
    function onDocClick(ev: MouseEvent) {
      const el = ev.target as Node | null
      if (!el) return
      if (headerRef.current && headerRef.current.contains(el)) return
      setOpen(null)
      setMobileOpen(false)
    }
    function onEsc(ev: KeyboardEvent) {
      if (ev.key === 'Escape') {
        setOpen(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [])

  return (
    <div className="site">
      <header className="site-header" ref={(node) => (headerRef.current = node)}>
        <div className="govbar">
          <div className="container govbar-inner">
            <div className="govbar-left">
              <a className="govbar-link" href="#" onClick={(e) => e.preventDefault()}>
                Diário Oficial
              </a>
              <a className="govbar-link" href="#" onClick={(e) => e.preventDefault()}>
                Transparência
              </a>
              <a className="govbar-link" href="#" onClick={(e) => e.preventDefault()}>
                Portal do Governo
              </a>
              <a className="govbar-link" href="#" onClick={(e) => e.preventDefault()}>
                Acesso à informação
              </a>
              <a className="govbar-link" href="#" onClick={(e) => e.preventDefault()}>
                Índice de Transparência e Governança
              </a>
            </div>
            <form className="govbar-search" role="search" onSubmit={(e) => e.preventDefault()}>
              <input className="govbar-input" placeholder="Pesquisar no site CGE" />
              <button className="govbar-btn" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </div>

        <div className="masthead">
          <div className="container masthead-inner">
            <div className="logos">
              <NavLink to="/" className="logo-block text-logo" onClick={() => setOpen(null)}>
                <span className="logo-text">
                  <span className="logo-title">Controladoria</span>
                  <strong>Geral do Estado de Roraima</strong>
                </span>
              </NavLink>
            </div>

            <button
              type="button"
              className="mobile-toggle"
              aria-label="Abrir menu"
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((v) => !v)
                setOpen(null)
              }}
            >
              ☰
            </button>

            <nav className="mainnav" aria-label="Menu principal">
              <NavLink to="/" className="mainnav-link" end onClick={() => setOpen(null)}>
                Home
              </NavLink>

              <div className="mainnav-item">
                <button
                  type="button"
                  className="mainnav-trigger"
                  aria-haspopup="menu"
                  aria-expanded={open === 'institucional'}
                  onClick={() => setOpen(open === 'institucional' ? null : 'institucional')}
                >
                  Institucional <span className="caret">▾</span>
                </button>
                {open === 'institucional' && (
                  <div className="dropdown" role="menu">
                    {menus.institucional.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => (isActive ? 'active' : undefined)}
                        onClick={() => setOpen(null)}
                        role="menuitem"
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <div className="mainnav-item">
                <button
                  type="button"
                  className="mainnav-trigger"
                  aria-haspopup="menu"
                  aria-expanded={open === 'servicos'}
                  onClick={() => setOpen(open === 'servicos' ? null : 'servicos')}
                >
                  Guias e Manuais <span className="caret">▾</span>
                </button>
                {open === 'servicos' && (
                  <div className="dropdown" role="menu">
                    {menus.servicos.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => (isActive ? 'active' : undefined)}
                        onClick={() => setOpen(null)}
                        role="menuitem"
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/contato" className="mainnav-link" onClick={() => setOpen(null)}>
                Contato
              </NavLink>

              <a className="mainnav-link highlight" href="#" onClick={(e) => e.preventDefault()}>
                Carta de Serviços
              </a>
            </nav>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="mobile-overlay"
          role="presentation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-header">
          <div className="mobile-drawer-title">Menu</div>
          <button
            type="button"
            className="mobile-close"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>

        <div className="mobile-drawer-body">
          <NavLink
            to="/"
            className="mobile-link"
            end
            onClick={() => {
              setMobileOpen(false)
              setMobileSection(null)
            }}
          >
            Home
          </NavLink>

          <button
            type="button"
            className="mobile-trigger"
            aria-expanded={mobileSection === 'institucional'}
            onClick={() => setMobileSection(mobileSection === 'institucional' ? null : 'institucional')}
          >
            Institucional <span className="caret">▾</span>
          </button>
          {mobileSection === 'institucional' && (
            <div className="mobile-sub">
              {menus.institucional.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="mobile-sublink"
                  onClick={() => {
                    setMobileOpen(false)
                    setMobileSection(null)
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}

          <button
            type="button"
            className="mobile-trigger"
            aria-expanded={mobileSection === 'servicos'}
            onClick={() => setMobileSection(mobileSection === 'servicos' ? null : 'servicos')}
          >
            Guias e Manuais <span className="caret">▾</span>
          </button>
          {mobileSection === 'servicos' && (
            <div className="mobile-sub">
              {menus.servicos.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="mobile-sublink"
                  onClick={() => {
                    setMobileOpen(false)
                    setMobileSection(null)
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}

          <NavLink
            to="/contato"
            className="mobile-link"
            onClick={() => {
              setMobileOpen(false)
              setMobileSection(null)
            }}
          >
            Contato
          </NavLink>

          <a
            className="mobile-link highlight"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setMobileOpen(false)
              setMobileSection(null)
            }}
          >
            Carta de Serviços
          </a>
        </div>
      </aside>

      <Outlet />

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-col">
            <h4>Institucional</h4>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Quem somos
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Missão, visão e valores
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Estrutura e competências
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Horário de atendimento
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Carta de Serviços
            </a>
          </div>

          <div className="footer-col">
            <h4>Normas e Legislação</h4>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Legislação estadual
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Decretos e portarias
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Resoluções
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Comunicados
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Editais
            </a>
          </div>

          <div className="footer-col">
            <h4>Áreas de Atuação</h4>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Auditoria
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Correição
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Integridade
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Ouvidoria
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Combate à corrupção
            </a>
          </div>

          <div className="footer-col">
            <h4>Transparência</h4>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Portal da Transparência
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              SIC
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Termos de uso
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Política de privacidade
            </a>
          </div>
        </div>

        <div className="container footer-bottom">
          <div className="footer-brand">
            <img
              className="footer-logo"
              src="/images/brasao-governo-rr.png"
              alt="Governo de Roraima"
            />
          </div>
          <div className="footer-copy">
            © {new Date().getFullYear()} Desenvolvido por Departamento de Trsnparência - DTCON/CGE-RR
          </div>
          <div className="footer-social">
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">
              f
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="X">
              x
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram">
              ig
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="LinkedIn">
              in
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} aria-label="YouTube">
              yt
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
