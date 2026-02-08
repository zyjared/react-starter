'use client'

import { SidebarInset, SidebarProvider } from '@r/ui/primitives/sidebar'
import { Outlet } from '@/router'
import { useLayout } from '../context'
import { AppSidebar } from './sidebar'

export { sidebarVariants } from './sidebar'

interface AppLayoutProps {
  children?: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const config = useLayout()
  return (
    <SidebarProvider>
      <AppSidebar {...config} />
      <SidebarInset>
        {children ?? <Outlet />}
      </SidebarInset>
    </SidebarProvider>
  )
}
