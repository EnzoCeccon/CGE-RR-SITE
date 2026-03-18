import { useEffect, useState } from 'react'

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
    vw?: string
    'vw-access-button'?: string
    'vw-plugin-wrapper'?: string
  }
}

type VLibrasStatus = 'loading' | 'ready' | 'error'

const VLIBRAS_SCRIPT_ID = 'vlibras-plugin-script'
const VLIBRAS_APP_URL = 'https://vlibras.gov.br/app'

let vlibrasLoaderPromise: Promise<void> | null = null

function initializeVLibrasWidget() {
  if (!window.VLibras || window.__vlibrasWidgetInitialized) return

  new window.VLibras.Widget(VLIBRAS_APP_URL)
  window.__vlibrasWidgetInitialized = true
  window.dispatchEvent(new CustomEvent('vlibras-ready'))
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
      window.dispatchEvent(new CustomEvent('vlibras-error'))
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

export default function VLibrasPlugin() {
  const [status, setStatus] = useState<VLibrasStatus>(
    window.__vlibrasWidgetInitialized ? 'ready' : 'loading',
  )

  useEffect(() => {
    function handleReady() {
      setStatus('ready')
    }

    function handleError() {
      setStatus('error')
    }

    if (window.__vlibrasWidgetInitialized) {
      setStatus('ready')
    } else {
      setStatus('loading')
      void loadVLibrasScript().then(handleReady).catch(handleError)
    }

    window.addEventListener('vlibras-ready', handleReady)
    window.addEventListener('vlibras-error', handleError)

    return () => {
      window.removeEventListener('vlibras-ready', handleReady)
      window.removeEventListener('vlibras-error', handleError)
    }
  }, [])

  if (status === 'error') {
    return null
  }

  return (
    <div vw="" className="enabled vlibras-host">
      <div vw-access-button="" className="active" />
      <div vw-plugin-wrapper="">
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  )
}
