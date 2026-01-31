import { ThemeProvider } from '@r/ui'
import { AppLayout } from './components/layout/AppLayout'

import './App.css'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppLayout />
    </ThemeProvider>
  )
}
