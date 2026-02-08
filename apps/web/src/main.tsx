import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { getAuthToken } from '@/features/auth'
import { configureHttpClient } from '@/shared/api'
import { App } from './app'
import './index.css'

configureHttpClient({
  getToken: getAuthToken,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
