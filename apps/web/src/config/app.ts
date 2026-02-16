import type { AppConfig } from './schema'
import { getRuntimeConfig } from './runtime'

const appConfig: AppConfig = {
  build: {
    version: __APP_VERSION__,
    buildTime: __APP_BUILD_TIME__,
  },
  branding: {
    name: 'React Starter',
    shortName: 'Starter',
    description: 'A React Starter Kit',
    logo: {
      type: 'image',
      url: '/vite.svg',
    },
  },
  theme: {
    mode: 'dark',
    palette: 'aurora',
  },
  layout: {
  },
  i18n: {
    defaultLocale: 'zh-CN',
    locales: [
      { code: 'zh-CN', label: '中文' },
      { code: 'en-US', label: 'English' },
    ],
    storageKey: 'i18n-locale',
  },
  runtime: getRuntimeConfig(),
}

export function getAppConfig() {
  return appConfig
}
