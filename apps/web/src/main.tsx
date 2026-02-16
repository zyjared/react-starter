import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app'
import { getEnvConfig } from './config'
import './index.css'

async function bootstrap() {
  const env = getEnvConfig()

  if (env.mockEnabled) {
    const { worker } = await import('./mocks/browser')
    await worker.start()
  }

  const root = document.getElementById('root')

  if (!root) {
    if (env.mode !== 'production') {
      console.error('Root element not found')
    }
    return
  }

  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

bootstrap()
