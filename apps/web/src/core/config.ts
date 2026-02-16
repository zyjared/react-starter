import type { Messages } from '@lingui/core'
import type { _t } from '@lingui/react/macro'
import type { LucideIcon } from 'lucide-react'
import type { LayoutConfig } from '@/layout'

interface DefineAppConfigpOptions {
  /**
   * 无法在外部直接调用
   */
  t: typeof _t
}

export interface AppConfig {
  title: LayoutConfig['title']
  subtitle: LayoutConfig['subtitle']
  logo?: LucideIcon
  sidebar?: {
    menu?: LayoutConfig['menu']
    userActions?: LayoutConfig['userActions']
  }
  i18n?: {
    storagePrefix?: string
    defaultLocale?: string
    locales: Record<string, {
      text: string
      messages?: Messages
    }>
  }
}

export type AppConfigFactory = (options: DefineAppConfigpOptions) => AppConfig

let appConfig: AppConfig | null = null

export function defineAppConfig(config: AppConfig) {
  return () => {
    if (!appConfig) {
      appConfig = config
    }
    return appConfig
  }
}
