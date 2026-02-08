import type { LayoutConfig } from '@/layout/types'
import { Sidebar, SidebarContent, SidebarRail } from '@r/ui/primitives/sidebar'
import { AppSidebarFooter, AppSidebarHeader, AppSidebarMenu } from './app'

export const sidebarVariants = {
  Default: 'default',
  Ai: 'ai',
  None: 'none',
}

export type SidebarVariant = (typeof sidebarVariants)[keyof typeof sidebarVariants]

// const SIDEBAR_CONTENT_MAP = {
//   [sidebarVariants.Default]: AppSidebarGroupActions,
//   [sidebarVariants.Ai]: AiSidebarGroupChats,
//   [sidebarVariants.None]: null,
// }

export function AppSidebar({
  title,
  logo,
  subtitle,
  menu,
}: LayoutConfig): React.ReactNode {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarHeader title={title} logo={logo} subtitle={subtitle} />
      <SidebarContent>
        <AppSidebarMenu menu={menu} />
      </SidebarContent>
      <SidebarRail />
      <AppSidebarFooter />
    </Sidebar>
  )
}
