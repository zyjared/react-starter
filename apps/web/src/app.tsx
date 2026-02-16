import { i18n } from '@lingui/core'

import { I18nProvider } from '@lingui/react'
import { ThemeProvider } from '@r/ui/components/theme'

import { Toaster } from '@r/ui/primitives/sonner'
import { Spinner } from '@r/ui/primitives/spinner'
import { TooltipProvider } from '@r/ui/primitives/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import getAppConfig from './config'
import { useI18nReady } from './i18n'
import { createLayoutConfig, LayoutProvider as LayoutProviderRaw } from './layout'
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

/**
 * 需要在 i18n 中
 */
function LayoutProvider({ children }: { children: React.ReactNode }) {
  const data = getAppConfig()
  const layoutConfig = createLayoutConfig({
    title: data.title,
    subtitle: data.subtitle,
    logo: data.logo,
    menu: data.sidebar?.menu,
    userActions: data.sidebar?.userActions,
  })

  return (
    <LayoutProviderRaw value={layoutConfig}>
      {children}
    </LayoutProviderRaw>
  )
}

export function App() {
  const i18nReady = useI18nReady()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">

        {i18nReady
          ? (
              <I18nProvider i18n={i18n}>
                <TooltipProvider>
                  <Toaster />
                  <LayoutProvider>
                    <RouterProvider router={router} />
                  </LayoutProvider>
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
            )}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
