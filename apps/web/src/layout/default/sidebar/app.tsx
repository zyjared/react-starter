import type { ProcessedMenuGroup } from '@/layout/sidebar'
import type { LayoutConfig, LayoutMenuItem } from '@/layout/types'
import { useLingui } from '@lingui/react'
import { Trans } from '@lingui/react/macro'

import { useIsMobile } from '@r/ui'

import { useTheme } from '@r/ui/components/theme'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@r/ui/primitives/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@r/ui/primitives/collapsible'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@r/ui/primitives/dropdown-menu'
import {
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@r/ui/primitives/sidebar'
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  LanguagesIcon,
  LogOut,
  SunMoonIcon,
} from 'lucide-react'
import { useMemo } from 'react'
import { useAuthStore } from '@/features/auth'
import { LOCALES, tryActivateLocale } from '@/i18n'
import { isMenuItemCollapsible, menuVariant, processMenu } from '@/layout/sidebar'
import { Link, useLocation } from '@/router'

export function AppSidebarHeader({ title, logo, subtitle }: Pick<LayoutConfig, 'title' | 'logo' | 'subtitle'>) {
  const Logo = logo
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              {Logo && <Logo className="size-4" />}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {title || ''}
              </span>
              <span className="truncate text-xs">
                {subtitle || ''}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  )
}

function AppSidebarMenuArea({ items }: { items: LayoutMenuItem[] }) {
  return (
    <SidebarMenu>
      {items.map(item => (
        isMenuItemCollapsible(item)
          ? (
              <Collapsible
                key={item.label}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.label}>
                      {item.icon && <item.icon />}
                      <span>{item.label}</span>
                      <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map(subItem => (
                        subItem.path
                          ? (
                              <SidebarMenuSubItem key={subItem.label}>
                                <SidebarMenuSubButton asChild>
                                  <Link to={subItem.path}>
                                    {subItem.icon && <subItem.icon />}
                                    <span>{subItem.label}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          : null
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          : (
              item.path
                ? (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.label}
                        isActive={item.isActive}
                      >
                        <Link to={item.path}>
                          {item.icon && <item.icon />}
                          <span className="group-data-[collapsible=icon]:sr-only">{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                : null
            )
      ))}
    </SidebarMenu>
  )
}

export function AppSidebarMenu({ menu }: Pick<LayoutConfig, 'menu'>) {
  const location = useLocation()

  // 每次路由变化，需要检查是否需要hidden
  const data = useMemo(() => processMenu(menu ?? [], {
    pathname: location.pathname,
  }), [menu, location.pathname])

  if (!data.menu?.length) {
    return null
  }

  if (data.variant !== menuVariant.group) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <AppSidebarMenuArea items={data.menu as LayoutMenuItem[]} />
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    (data.menu as ProcessedMenuGroup[]).map(group => (
      <SidebarGroup key={group.key}>
        <SidebarGroupLabel>
          {group.icon && <group.icon className="mr-2 inline-block size-4" />}
          {group.text}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <AppSidebarMenuArea items={group.items ?? []} />
        </SidebarGroupContent>
      </SidebarGroup>
    ),
    )
  )
}

export interface AppSidebarFooterProps {
  user: {
    name: string
    email: string
    avatar: string
  }
  isMobile: boolean
}

export function AppSidebarFooter() {
  const isMobile = useIsMobile()
  const { theme, setTheme } = useTheme()
  const { i18n } = useLingui()
  const user = useAuthStore(u => u.user)

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user?.avatar}
                    alt={user?.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.name}
                  </span>
                  <span className="truncate text-xs">
                    {user?.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.avatar}
                      alt={user?.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  <Trans>账号</Trans>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  <Trans>通知</Trans>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <SunMoonIcon />
                    <Trans>主题</Trans>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={theme} onValueChange={value => setTheme(value as any)}>
                      <DropdownMenuRadioItem value="system">
                        <Trans>系统</Trans>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="light">
                        <Trans>亮色</Trans>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="dark">
                        <Trans>暗色</Trans>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <LanguagesIcon />
                    <Trans>语言</Trans>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={i18n.locale} onValueChange={tryActivateLocale}>
                      {LOCALES.map(({ local, text }) => (
                        <DropdownMenuRadioItem key={local} value={local}>
                          {text}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                <Trans>退出登录</Trans>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
