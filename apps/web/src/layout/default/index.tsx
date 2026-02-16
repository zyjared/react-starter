'use client'

import type { MessageDescriptor } from '@lingui/core'
import type { ProcessedLayoutUserAction } from '../types'
import { useLingui } from '@lingui/react'
import { SidebarInset, SidebarProvider } from '@r/ui/primitives/sidebar'
import { useAuthStore } from '@/features/auth'
import { Outlet, useLocation } from '@/router'
import { useLayout } from '../context'
import { processMenu } from '../sidebar'
import { AppSidebar } from './sidebar'

export { sidebarVariants } from './sidebar'

interface AppLayoutProps {
  children?: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const configRaw = useLayout()
  const { _ } = useLingui()
  const location = useLocation()
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)

  const translate = (v?: string | MessageDescriptor) => !v || typeof v === 'string' ? v || '' : _(v)

  const config = {
    title: translate(configRaw.title),
    logo: configRaw.logo,
    subtitle: translate(configRaw.subtitle),
    menu: processMenu(configRaw.menu, {
      translate,
      pathname: location.pathname,
    }),
    userActions: configRaw.userActions?.map((item) => {
      const text = translate(item.text)
      return { ...(item as ProcessedLayoutUserAction), text, key: text }
    }),
  }

  return (
    <SidebarProvider>
      <AppSidebar
        {...config}
        user={user}
        onLogout={logout}
      />
      <SidebarInset>
        {/* {JSON.stringify(config, null, 2)} */}
        {children ?? <Outlet />}
      </SidebarInset>
    </SidebarProvider>
  )
}
