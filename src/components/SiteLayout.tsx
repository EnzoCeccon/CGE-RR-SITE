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
                ITGP - Índice de Transparência e Governança
              </a>
            </div>
            <form className="govbar-search" role="search" onSubmit={(e) => e.preventDefault()}>
              <input className="govbar-input" placeholder="Pesquisar no portal" />
              <button className="govbar-btn" type="submit">
                Buscar
              </button>
            </form>
          </div>
        </div>

        <div className="masthead">
          <div className="container masthead-inner">
            <div className="logos">
              <NavLink to="/" className="logo-block" onClick={() => setOpen(null)}>
                <span className="logo-mark" aria-hidden="true" />
                <span className="logo-text">
                  <strong>CGE-RR</strong>
                  <small>Controladoria Geral</small>
                </span>
              </NavLink>
              <div className="logo-divider" aria-hidden="true" />
              <a className="logo-block" href="#" onClick={(e) => e.preventDefault()}>
                <span className="logo-mark alt" aria-hidden="true" />
                <span className="logo-text">
                  <strong>Governo</strong>
                  <small>de Roraima</small>
                </span>
              </a>
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
        <div className="container">
          © {new Date().getFullYear()} Controladoria — Conteúdo institucional (exemplo).
        </div>
      </footer>
    </div>
  )
}
