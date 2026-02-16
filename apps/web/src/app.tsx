import { useAuthStore } from '@kit/features/auth'
import { setupHttp } from '@kit/shared'
import { ThemeProvider } from '@kit/ui/components/theme'
import { Toaster } from '@kit/ui/foundation/sonner'
import { Spinner } from '@kit/ui/foundation/spinner'
import { TooltipProvider } from '@kit/ui/foundation/tooltip'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useI18nReady } from '@/i18n'
import { THEME_PALETTE_LOADERS } from '@/layouts/theme'

import { getAppConfig } from './config'
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
  const { theme } = getAppConfig()
  const i18nReady = useI18nReady()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        paletteLoaders={THEME_PALETTE_LOADERS}
        defaultPalette={theme?.palette}
        defaultTheme={theme?.mode}
      >
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
