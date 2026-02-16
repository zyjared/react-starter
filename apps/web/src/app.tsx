import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { useAuthStore } from '@r/features/auth'
import { setupHttp } from '@r/shared'
import { ThemeProvider } from '@r/ui/components/theme'
import { Toaster } from '@r/ui/primitives/sonner'
import { Spinner } from '@r/ui/primitives/spinner'
import { TooltipProvider } from '@r/ui/primitives/tooltip'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useI18nReady } from '@/i18n'

import { router, RouterProvider } from './router'
import './app.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

setupHttp({
  onGetToken: () => {
    return useAuthStore.getState().token
  },
  onUnauthorized: () => {
    useAuthStore.getState().clearAuth()
  },

})

export function App() {
  const i18nReady = useI18nReady()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        {
          i18nReady
            ? (
                <I18nProvider i18n={i18n}>
                  <TooltipProvider>
                    <Toaster />
                    <RouterProvider router={router} />
                  </TooltipProvider>
                </I18nProvider>
              )
            : (
                <div className="flex min-h-dvh items-center justify-center gap-2 text-muted-foreground">
                  <Spinner className="size-5" />
                  <span>
                    载入中...
                  </span>
                </div>
              )
        }
      </ThemeProvider>
    </QueryClientProvider>
  )
}
