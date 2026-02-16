import { useLingui } from '@lingui/react/macro'
import { BotIcon, HomeIcon, UserIcon } from 'lucide-react'
import { useMemo } from 'react'
import { getAppConfig } from '@/config'
import { AppSidebar } from './components/sidebar'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useLingui()
  const app = getAppConfig()
  const menus = useMemo(
    () => [
      {
        id: 'home',
        label: t`首页`,
        icon: HomeIcon,
        path: '/',
      },
      {
        id: 'chat',
        label: t`AI`,
        icon: BotIcon,
        path: '/chat',
      },
      {
        id: 'user',
        label: t`用户管理`,
        icon: UserIcon,
        items: [
          {
            id: 'user/list',
            label: t`用户列表`,
            icon: UserIcon,
            path: '/user/list',
          },
          {
            id: 'user/role',
            label: t`角色管理`,
            icon: UserIcon,
            path: '/user/role',
          },
        ],
      },
    ],
    [t],
  )

  return (

    <AppSidebar menus={menus} locales={app.i18n?.locales}>
      {children}
    </AppSidebar>
  )
}
