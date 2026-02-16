import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@kit/ui/foundation/sidebar'
import { cn } from '@kit/ui/lib'
import { LogOut } from 'lucide-react'

export function AppSidebarHeader() {
  const Logo = LogOut

  const title = 'React Start'
  const subtitle = 'Starter'

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className={cn(
              'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
              'hover:bg-transparent active:bg-transparent',
            )}
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              {Logo && <Logo className="size-4" />}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {title}
              </span>
              <span className="truncate text-xs">
                {subtitle}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}
