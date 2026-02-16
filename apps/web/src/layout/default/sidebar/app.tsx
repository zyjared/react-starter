import type { Palette, Theme } from '@r/ui/components/theme'
// import { useLingui } from '@lingui/react'

import type { ProcessedLayoutConfig, ProcessedLayoutMenuItem } from '@/layout/types'

import { Trans, useLingui } from '@lingui/react/macro'
import { cn, useIsMobile } from '@r/ui'
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
  ChevronRight,
  ChevronsUpDown,
  LanguagesIcon,
  LogOut,
  PaletteIcon,
  SunMoonIcon,
} from 'lucide-react'
import { useMemo } from 'react'
import getAppConfig from '@/config'
import { tryActivateLocale } from '@/i18n'
import { isMenuItemCollapsible, menuVariant } from '@/layout/sidebar'
import { Link } from '@/router'

export function AppSidebarHeader({ title, logo, subtitle }: Pick<ProcessedLayoutConfig, 'title' | 'logo' | 'subtitle'>) {
  const Logo = logo

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

function AppSidebarMenuArea({ items }: { items: ProcessedLayoutMenuItem[] }) {
  return (
    <SidebarMenu>
      {items.map(item => isMenuItemCollapsible(item)
        ? (
            <Collapsible
              key={item.key}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.text}>
                    {item.icon && <item.icon />}
                    <span>{item.text}</span>
                    <ChevronRight className="ml-auto transition-transform duration-300 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map(subItem => subItem.path
                      ? (
                          <SidebarMenuSubItem key={subItem.key}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.path}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.text}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      : null,
                    )}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        : (
            item.path
              ? (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.text}
                      isActive={item.isActive}
                    >
                      <Link to={item.path}>
                        {item.icon && <item.icon />}
                        <span className="group-data-[collapsible=icon]:sr-only">{item.text}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              : null
          ),
      )}
    </SidebarMenu>
  )
}

export function AppSidebarMenu({ items, variant }: Required<ProcessedLayoutConfig>['menu']) {
  if (!items?.length) {
    return null
  }

  if (variant !== menuVariant.group) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <AppSidebarMenuArea items={items as ProcessedLayoutMenuItem[]} />
        </SidebarGroupContent>
      </SidebarGroup>
    )
  }

  return (
    items.map(group => (
      <SidebarGroup key={group.key}>
        {
          group.text && (
            <SidebarGroupLabel>
              {group.icon && <group.icon className="mr-2 inline-block size-4" />}
              { group.text }
            </SidebarGroupLabel>
          )
        }
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
  } | null
  onLogout?: () => void
  userActions?: ProcessedLayoutConfig['userActions']
}

export function AppSidebarFooter({ user, onLogout, userActions }: AppSidebarFooterProps) {
  const isMobile = useIsMobile()
  const { theme, setTheme, palette, setPalette } = useTheme()
  const { i18n, t } = useLingui()
  const appConfig = getAppConfig()
  const locales = Object.entries(appConfig.i18n?.locales ?? {}).map(([key, value]) => ({
    text: value.text,
    locale: key,
  }))

  const themes = useMemo(() => [
    {
      text: t`系统`,
      value: 'system',
    },
    {
      text: t`亮色`,
      value: 'light',
    },
    {
      text: t`暗色`,
      value: 'dark',
    },
  ], [t])

  const palettes = useMemo(() => [
    {
      text: t`默认`,
      value: 'default',
    },
    {
      text: t`极光`,
      value: 'aurora',
    },
    {
      text: t`雪松`,
      value: 'cedar',
    },
    {
      text: t`森林`,
      value: 'forest',
    },
    {
      text: t`冰川`,
      value: 'glacier',
    },
    {
      text: t`墨岚`,
      value: 'ink',
    },
    {
      text: t`流明`,
      value: 'lumina',
    },
    {
      text: t`玫晓`,
      value: 'rosedawn',
    },
    {
      text: t`落日`,
      value: 'sunset',
    },
  ], [t])

  if (!user) {
    return (
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link to="/login">
              <SidebarMenuButton size="lg">
                <LogOut className="size-4" />
                <span className="font-semibold"><Trans>登录</Trans></span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    )
  }

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
                    src={user.avatar}
                    alt={user.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user.name}
                  </span>
                  <span className="truncate text-xs">
                    {user.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.avatar}
                      alt={user.name}
                    />
                    <AvatarFallback className="rounded-lg">
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user.name}
                    </span>
                    <span className="truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              {userActions && userActions.length > 0 && (
                <>
                  <DropdownMenuGroup>
                    {userActions.map(action => (
                      <DropdownMenuItem key={action.key} onClick={action.onClick}>
                        {action.icon && <action.icon />}
                        {typeof action.text === 'string' ? action.text : i18n._(action.text)}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                </>
              )}

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <SunMoonIcon />
                    <Trans>主题</Trans>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={theme} onValueChange={value => setTheme(value as Theme)}>
                      {themes.map(item => (
                        <DropdownMenuRadioItem key={item.value} value={item.value}>
                          {item.text}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <PaletteIcon />
                    <Trans>配色</Trans>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={palette} onValueChange={value => setPalette(value as Palette)}>
                      {
                        palettes.map(item => (
                          <DropdownMenuRadioItem key={item.value} value={item.value}>
                            {item.text}
                          </DropdownMenuRadioItem>
                        ))
                      }
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
                      {locales.map(({ locale, text }) => (
                        <DropdownMenuRadioItem key={locale} value={locale}>
                          {text}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
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
