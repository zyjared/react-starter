import { msg } from '@lingui/core/macro'
import { BadgeCheck, Bell, HouseIcon, ProjectorIcon, SettingsIcon } from 'lucide-react'
import { defineAppConfig } from './core/config'
import { messages as zhMessages } from './locales/zh/messages'
import { isActivePath } from './router'

export default defineAppConfig({
  title: msg`React Starter`,
  subtitle: msg`A React Starter Kit`,
  logo: HouseIcon,
  sidebar: {
    menu: {
      main: {
        items: [
          {
            key: 'home',
            text: msg`首页`,
            path: '/',
            icon: HouseIcon,
            hidden: pathname => pathname === '/',
          },
          {
            key: 'chat',
            text: msg`聊天`,
            path: '/chat',
            icon: ProjectorIcon,
            hidden: pathname => isActivePath('/chat', pathname),
          },
        ],
      },
      nav: {
        text: msg`菜单`,
        items: [
          {
            key: 'settings',
            text: msg`设置`,
            // path: '/settings',
            icon: SettingsIcon,
            items: [
              {
                key: 'profile',
                text: msg`个人中心`,
                path: '/settings/profile',
              },
            ],
          },
        ],
      },
    },
    userActions: [
      {
        key: 'account',
        text: msg`账号`,
        icon: BadgeCheck,
      },
      {
        key: 'notifications',
        text: msg`通知`,
        icon: Bell,
      },
    ],
  },
  i18n: {
    storagePrefix: 'i18n',
    defaultLocale: 'zh',
    locales: {
      'zh': {
        text: '中文',
        messages: zhMessages,
      },
      'zh-Hant': {
        text: '中文（繁體）',
      },
      'en': {
        text: 'English',
      },
      'ja': {
        text: '日本語',
      },
    },
  },
})
