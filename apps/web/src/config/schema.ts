type ValidUrl = `${'http' | 'https'}://${string}` | `/${string}`

export type LocaleCode = 'zh-CN' | 'en-US'

export interface LocalizedLabel {
  locale: LocaleCode
  label: string
}

export interface BuildConfig {
  version: string
  buildTime: string
}

export interface BrandingLogoConfig {
  type: 'image' | 'icon'
  key?: string
  url?: ValidUrl
  sizes?: {
    sm: string
    md: string
    lg: string
  }
}

export interface BrandingConfig {
  name: string
  shortName?: string
  description?: string
  logo: BrandingLogoConfig
}

export interface I18nLocaleConfig {
  code: LocaleCode
  label: string
}

export interface I18nConfig {
  defaultLocale: LocaleCode
  locales: I18nLocaleConfig[]
  storageKey?: string
}

export type ThemeMode = 'light' | 'dark' | 'system'
export type ThemePalette = 'default'
  | 'aurora'
  | 'forest'
  | 'glacier'
  | 'ink'

export interface ThemeConfig {
  mode: ThemeMode
  palette: ThemePalette
  storageKey?: string
}

export interface LayoutConfig {
  // breadcrumbs?: boolean
  // watermark?: boolean
}

export interface FeatureFlagsConfig {
  [flagName: string]: boolean
}

export interface ApiEndpointConfig {
  name: string
  baseUrl: string
  weight?: number
  disabled?: boolean
  /**
   * 请求超时时间，单位毫秒
   */
  headers?: Record<string, string>
  proxy?: boolean
  timeout?: number
  retry?: {
    /**
     * 重试次数
     */
    count?: number
    /**
     * 重试延迟时间，单位毫秒
     */
    delay?: number
  }
}

export interface ApiConfig {
  defaultEndpoint: string
  endpoints: ApiEndpointConfig[]
}

export interface AuthSessionConfig {
  /**
   * 会话存储键名
   */
  key?: string
  /**
   * 刷新间隔，单位秒
   */
  refreshMargin: number
  /**
   * 心跳间隔，单位秒
   */
  heartbeat: number
  /**
   * 会话存储类型
   */
  storage?: 'localStorage' | 'sessionStorage' | 'cookie'
}

export interface AuthConfig {
  session?: AuthSessionConfig
}

export interface ObservabilityConfig {
  logLevel?: RuntimeLogLevel
}

export interface RuntimeConfig {
  env: RuntimeEnvironment
  api: ApiConfig
  auth?: AuthConfig
  observability?: ObservabilityConfig
  featureFlags?: FeatureFlagsConfig
}

export interface AppConfig {
  build: BuildConfig
  branding: BrandingConfig
  i18n?: I18nConfig
  layout?: LayoutConfig
  theme?: ThemeConfig
  runtime: RuntimeConfig
}
