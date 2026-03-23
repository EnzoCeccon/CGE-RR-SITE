import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

type FontScale = 'default' | 'large' | 'xlarge'

type AccessibilityState = {
  contrast: boolean
  highlightLinks: boolean
  fontScale: FontScale
}

type FloatingPosition = {
  x: number
  y: number
}

const STORAGE_KEY = 'cge-rr-accessibility'
const POSITION_STORAGE_KEY = 'cge-rr-accessibility-position'

const defaultState: AccessibilityState = {
  contrast: false,
  highlightLinks: false,
  fontScale: 'default',
}

function applyAccessibility(state: AccessibilityState) {
  document.body.classList.toggle('a11y-high-contrast', state.contrast)
  document.body.classList.toggle('a11y-highlight-links', state.highlightLinks)
  document.body.classList.remove('a11y-font-large', 'a11y-font-xlarge')

  if (state.fontScale === 'large') {
    document.body.classList.add('a11y-font-large')
  }

  if (state.fontScale === 'xlarge') {
    document.body.classList.add('a11y-font-xlarge')
  }
}

function clampPosition(x: number, y: number) {
  const margin = 12
  const width = 168
  const height = 52

  return {
    x: Math.min(Math.max(x, margin), window.innerWidth - width - margin),
    y: Math.min(Math.max(y, margin), window.innerHeight - height - margin),
  }
}

function getDefaultPosition() {
  return clampPosition(window.innerWidth - 180, window.innerHeight - 76)
}

export default function AccessibilityTools() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<AccessibilityState>(defaultState)
  const [position, setPosition] = useState<FloatingPosition | null>(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const movedRef = useRef(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as AccessibilityState
        setState(parsed)
        applyAccessibility(parsed)
      } else {
        applyAccessibility(defaultState)
      }

      const savedPosition = window.localStorage.getItem(POSITION_STORAGE_KEY)
      if (savedPosition) {
        const parsedPosition = JSON.parse(savedPosition) as FloatingPosition
        setPosition(clampPosition(parsedPosition.x, parsedPosition.y))
      } else {
        setPosition(getDefaultPosition())
      }
    } catch {
      applyAccessibility(defaultState)
      setPosition(getDefaultPosition())
    }
  }, [])

  useEffect(() => {
    applyAccessibility(state)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  useEffect(() => {
    if (!position) return
    window.localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(position))
  }, [position])

  useEffect(() => {
    function onResize() {
      setPosition((value) => (value ? clampPosition(value.x, value.y) : getDefaultPosition()))
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!position) return null

  function handlePointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    dragOffsetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
    movedRef.current = false

    const pointerId = event.pointerId
    event.currentTarget.setPointerCapture(pointerId)

    function onPointerMove(moveEvent: PointerEvent) {
      if (
        Math.abs(moveEvent.clientX - rect.left - dragOffsetRef.current.x) > 4 ||
        Math.abs(moveEvent.clientY - rect.top - dragOffsetRef.current.y) > 4
      ) {
        movedRef.current = true
      }
      setPosition(
        clampPosition(
          moveEvent.clientX - dragOffsetRef.current.x,
          moveEvent.clientY - dragOffsetRef.current.y,
        ),
      )
    }

    function onPointerUp() {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.setTimeout(() => {
        movedRef.current = false
      }, 0)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  const toggleStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    right: 'auto',
    bottom: 'auto',
  } as const
  const panelStyle = {
    left: `${position.x}px`,
    top: `${Math.min(position.y + 60, window.innerHeight - 320)}px`,
    right: 'auto',
    bottom: 'auto',
  } as const

  return (
    <>
      <button
        type="button"
        className="accessibility-toggle"
        style={toggleStyle}
        aria-expanded={open}
        aria-controls="accessibility-panel"
        onPointerDown={handlePointerDown}
        onClick={() => {
          if (movedRef.current) return
          setOpen((value) => !value)
        }}
      >
        <span className="accessibility-toggle-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" role="presentation" focusable="false">
            <path
              d="M12 4.25a1.75 1.75 0 1 0 0 3.5a1.75 1.75 0 0 0 0-3.5ZM8.2 9.1a.75.75 0 0 0 0 1.5h2.9v2.28l-3.58 5.24a.75.75 0 1 0 1.24.86l2.49-3.65v4.42a.75.75 0 0 0 1.5 0v-4.42l2.49 3.65a.75.75 0 1 0 1.24-.86l-3.58-5.24V10.6h2.9a.75.75 0 0 0 0-1.5H8.2Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span>Acessibilidade</span>
      </button>

      {open && (
        <aside
          className="accessibility-panel"
          id="accessibility-panel"
          style={panelStyle}
          aria-label="Ferramentas de acessibilidade"
        >
          <div className="accessibility-panel-head">
            <strong>Recursos de acessibilidade</strong>
            <button type="button" className="accessibility-close" onClick={() => setOpen(false)}>
              Fechar
            </button>
          </div>

          <div className="accessibility-group">
            <span>Tamanho do texto</span>
            <div className="accessibility-actions">
              <button type="button" onClick={() => setState((value) => ({ ...value, fontScale: 'default' }))}>
                Padrao
              </button>
              <button type="button" onClick={() => setState((value) => ({ ...value, fontScale: 'large' }))}>
                A+
              </button>
              <button type="button" onClick={() => setState((value) => ({ ...value, fontScale: 'xlarge' }))}>
                A++
              </button>
            </div>
          </div>

          <div className="accessibility-group">
            <span>Leitura e contraste</span>
            <div className="accessibility-actions stacked">
              <button
                type="button"
                onClick={() => setState((value) => ({ ...value, contrast: !value.contrast }))}
              >
                {state.contrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
              </button>
              <button
                type="button"
                onClick={() =>
                  setState((value) => ({
                    ...value,
                    highlightLinks: !value.highlightLinks,
                  }))
                }
              >
                {state.highlightLinks ? 'Desativar destaque de links' : 'Destacar links'}
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  )
}
