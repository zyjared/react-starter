import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getAuthToken, useAuthStore } from '@/features/auth'
import { configureClient } from '@/shared/api'
import { App } from './app'
import './index.css'

configureClient({
  getToken: getAuthToken,
  onUnauthorized: () => {
    useAuthStore.getState().logout()
  },
})

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return
  }

  const { worker } = await import('./mocks/browser')
  return worker.start()
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
})
