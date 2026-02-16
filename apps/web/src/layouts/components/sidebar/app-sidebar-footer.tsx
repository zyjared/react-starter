import type { Palette, Theme } from '@kit/ui/components/theme'

import type { UserProfile } from '../../types'
import type { I18nConfig } from '@/config'
import { useTheme } from '@kit/ui/components/theme'
import { Avatar, AvatarFallback, AvatarImage } from '@kit/ui/foundation/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@kit/ui/foundation/dropdown-menu'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@kit/ui/foundation/sidebar'
import { useIsMobile } from '@kit/ui/hooks'
import { Trans, useLingui } from '@lingui/react/macro'
import { ChevronsUpDownIcon, LanguagesIcon, LogOutIcon, PaletteIcon, SunMoonIcon } from 'lucide-react'
import { useMemo } from 'react'
import { tryActivateLocale } from '@/i18n/activate'
import { THEME_PALETTES } from '@/layouts/theme'

export interface AppSidebarFooterProps {
  user?: UserProfile | null
  onLogout?: () => void
  locales?: I18nConfig['locales']
}

export function AppSidebarFooter({ user, onLogout, locales }: AppSidebarFooterProps) {
  const isMobile = useIsMobile()
  const { theme, setTheme, palette, setPalette } = useTheme()
  const { i18n, t } = useLingui()

  const themes = useMemo(
    () => [
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
    ] as const,
    [t],
  )

  const palettes = useMemo(() => THEME_PALETTES.map((it) => {
    return {
      ...it,
      text: t(it.text),
    }
  }), [t])

  const locale = useMemo(() => i18n.locale, [i18n])

  if (!user) {
    user = {
      name: ``,
      avatar: '',
      // description: t`未登录`,
    }
  }

  if (!user) {
    return (
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <LogOutIcon className="size-4" />
              <span className="group-data-[collapsible=icon]:sr-only font-semibold"><Trans>登录</Trans></span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    )
  }

  return (
    <SidebarFooter>
      <SidebarMenu>
        <DropdownMenu>
          <SidebarMenuItem>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar
                  size="lg"
                  className="rounded-lg group-data-[collapsible=icon]:size-8!"
                >
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
                    {user.description}
                  </span>
                </div>
                <ChevronsUpDownIcon className="ml-auto size-4" />
              </SidebarMenuButton>

            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="rounded-lg" size="lg">
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
                      {user.description}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

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
                        palettes.map(it => (
                          <DropdownMenuRadioItem key={it.value} value={it.value}>
                            {it.text}
                          </DropdownMenuRadioItem>
                        ))
                      }
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {locales?.length && (
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <LanguagesIcon />
                      <Trans>语言</Trans>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup value={locale} onValueChange={tryActivateLocale}>
                        {locales.map(it => (
                          <DropdownMenuRadioItem key={it.code} value={it.code}>
                            {it.label}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                )}
              </DropdownMenuGroup>
              {user && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOutIcon />
                    <Trans>退出登录</Trans>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>

          </SidebarMenuItem>
        </DropdownMenu>
      </SidebarMenu>
    </SidebarFooter>
  )
}
