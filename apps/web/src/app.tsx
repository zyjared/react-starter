import { i18n } from '@lingui/core'

import { I18nProvider } from '@lingui/react'
import { useLingui } from '@lingui/react/macro'

import { ThemeProvider } from '@r/ui/components/theme'
import { Toaster } from '@r/ui/primitives/sonner'
import { Spinner } from '@r/ui/primitives/spinner'
import { TooltipProvider } from '@r/ui/primitives/tooltip'
import { House, HouseIcon, ProjectorIcon, SettingsIcon } from 'lucide-react'
import { useMemo } from 'react'
import { isActivePath } from '@/router'
import { useI18nReady } from './i18n'
import { createLayoutConfig, LayoutProvider as LayoutProviderRaw } from './layout'
import { router, RouterProvider } from './router'
import './app.css'

/**
 * 需要在 i18n 中
 */
function LayoutProvider({ children}: { children: React.ReactNode }) {
  const { t } = useLingui()

  const config = useMemo(() => createLayoutConfig({
    logo: House,
    title: t`React Starter`,
    subtitle: t`基于 React 的项目模板`,

    menu: [
      {
        label: t`首页`,
        path: '/',
        icon: HouseIcon,
        hidden: pathname => pathname === '/',
      },
      {
        label: t`项目`,
        icon: HouseIcon,
        items: [
          {
            label: t`聊天`,
            path: '/ai',
            icon: ProjectorIcon,
            hidden: pathname => isActivePath('/ai', pathname),
          },
        ],
      },
      {
        label: t`导航`,
        icon: SettingsIcon,
        items: [
          {
            label: t`首页`,
            path: '/',
            icon: House,
          },
          {
            label: t`设置`,
            icon: SettingsIcon,
            path: '/settings',
          },
        ],
      },
    ],
  }), [t])

  return (
    <LayoutProviderRaw value={config}>
      {children}
    </LayoutProviderRaw>
  )
}

export function App() {
  const i18nReady = useI18nReady()

  return (
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
  )
}
