import type { I18nConfig } from '@/config'
import type { MenuItem, SidebarVariant } from '@/layouts/types'
import { Sidebar, SidebarContent, SidebarInset, SidebarProvider, SidebarRail } from '@kit/ui/foundation/sidebar'
import { SIDEBAR_VARIANT } from '@/layouts/constants'
import { AppSidebarFooter } from './app-sidebar-footer'
import { AppSidebarHeader } from './app-sidebar-header'
import { AppSidebarMenus } from './app-sidebar-menus'

export interface AppSidebarProps {
  children?: React.ReactNode
  menus: MenuItem[]
  variant?: SidebarVariant
  locales?: I18nConfig['locales']
}

export function AppSidebar({ children, menus, variant = SIDEBAR_VARIANT.GROUP, locales }: AppSidebarProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <AppSidebarHeader />
        <SidebarContent>
          <AppSidebarMenus menus={menus} variant={variant} />
        </SidebarContent>
        <SidebarRail />
        <AppSidebarFooter locales={locales} />
      </Sidebar>
      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
