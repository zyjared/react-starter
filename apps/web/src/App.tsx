import { ThemeProvider, ThemeToggle } from '@r/ui'
import { Button } from '@r/ui/components/button.tsx'

import './App.css'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex items-center justify-center h-screen">
        <ThemeToggle />
        <Button>你好</Button>
      </div>
    </ThemeProvider>
  )
}
