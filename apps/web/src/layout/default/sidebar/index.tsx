import type { AppSidebarFooterProps } from './app'
import type { ProcessedLayoutConfig } from '@/layout/types'
import { Sidebar, SidebarContent, SidebarRail } from '@r/ui/primitives/sidebar'
import { menuVariant } from '@/layout/sidebar'
import { AppSidebarFooter, AppSidebarHeader, AppSidebarMenu } from './app'

export const sidebarVariants = {
  Default: 'default',
  Ai: 'ai',
  None: 'none',
}

export type SidebarVariant = (typeof sidebarVariants)[keyof typeof sidebarVariants]

export type AppSidebarProps = ProcessedLayoutConfig & AppSidebarFooterProps

export function AppSidebar({
  title,
  logo,
  subtitle,
  menu,
  user,
  onLogout,
  userActions,
}: AppSidebarProps): React.ReactNode {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader title={title} logo={logo} subtitle={subtitle} />
      <SidebarContent>
        <AppSidebarMenu items={menu?.items ?? []} variant={menu?.variant ?? menuVariant.items} />
      </SidebarContent>
      <SidebarRail />
      <AppSidebarFooter user={user} onLogout={onLogout} userActions={userActions} />
    </Sidebar>
  )
}
