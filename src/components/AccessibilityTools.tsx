import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

declare global {
  interface Window {
    VLibras?: {
      Widget: new (target: string) => unknown
    }
    __vlibrasWidgetInitialized?: boolean
  }
}

declare module 'react' {
  interface HTMLAttributes<T> {
    vw?: boolean
    'vw-access-button'?: boolean
    'vw-plugin-wrapper'?: boolean
  }
}

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

type VLibrasStatus = 'loading' | 'ready' | 'error'

const STORAGE_KEY = 'cge-rr-accessibility'
const POSITION_STORAGE_KEY = 'cge-rr-accessibility-position'
const VLIBRAS_SCRIPT_ID = 'vlibras-plugin-script'
const VLIBRAS_APP_URL = 'https://vlibras.gov.br/app'

let vlibrasLoaderPromise: Promise<void> | null = null

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

function initializeVLibrasWidget() {
  if (!window.VLibras || window.__vlibrasWidgetInitialized) return

  new window.VLibras.Widget(VLIBRAS_APP_URL)
  window.__vlibrasWidgetInitialized = true
}

function loadVLibrasScript() {
  if (typeof window === 'undefined') {
    return Promise.resolve()
  }

  initializeVLibrasWidget()
  if (window.__vlibrasWidgetInitialized) {
    return Promise.resolve()
  }

  if (vlibrasLoaderPromise) {
    return vlibrasLoaderPromise
  }

  vlibrasLoaderPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(VLIBRAS_SCRIPT_ID) as HTMLScriptElement | null

    const handleLoad = () => {
      initializeVLibrasWidget()
      resolve()
    }

    const handleError = () => {
      vlibrasLoaderPromise = null
      reject(new Error('Falha ao carregar o script do VLibras.'))
    }

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        handleLoad()
        return
      }

      existingScript.addEventListener('load', handleLoad, { once: true })
      existingScript.addEventListener('error', handleError, { once: true })
      return
    }

    const script = document.createElement('script')
    script.id = VLIBRAS_SCRIPT_ID
    script.src = `${VLIBRAS_APP_URL}/vlibras-plugin.js`
    script.async = true
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true'
        handleLoad()
      },
      { once: true },
    )
    script.addEventListener('error', handleError, { once: true })
    document.body.appendChild(script)
  })

  return vlibrasLoaderPromise
}

export default function AccessibilityTools() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<AccessibilityState>(defaultState)
  const [position, setPosition] = useState<FloatingPosition | null>(null)
  const [vlibrasStatus, setVlibrasStatus] = useState<VLibrasStatus>(
    window.__vlibrasWidgetInitialized ? 'ready' : 'loading',
  )
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

  useEffect(() => {
    function handleReady() {
      setVlibrasStatus('ready')
    }

    function handleError() {
      setVlibrasStatus('error')
    }

    if (window.__vlibrasWidgetInitialized) {
      setVlibrasStatus('ready')
    } else {
      setVlibrasStatus('loading')
      void loadVLibrasScript().then(handleReady).catch(handleError)
    }

    window.addEventListener('vlibras-ready', handleReady)
    window.addEventListener('vlibras-error', handleError)

    return () => {
      window.removeEventListener('vlibras-ready', handleReady)
      window.removeEventListener('vlibras-error', handleError)
    }
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

  const vlibrasMessage =
    vlibrasStatus === 'ready'
      ? 'VLibras carregado. Use o botao flutuante oficial para abrir o tradutor.'
      : vlibrasStatus === 'error'
        ? 'Nao foi possivel carregar o VLibras automaticamente nesta tentativa.'
        : 'Carregando o widget oficial do VLibras.'

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
          ♿
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

          <div className="accessibility-group">
            <span>VLibras</span>
            <p>{vlibrasMessage}</p>
            {vlibrasStatus !== 'ready' && (
              <div className="accessibility-actions" style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setVlibrasStatus('loading')
                    void loadVLibrasScript()
                      .then(() => setVlibrasStatus('ready'))
                      .catch(() => setVlibrasStatus('error'))
                  }}
                >
                  Tentar carregar novamente
                </button>
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  )
}
