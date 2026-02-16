/// <reference types="vite/client" />

type RuntimeEnvironment = 'local' | 'development' | 'test' | 'staging' | 'production'
type RuntimeLogLevel = 'debug' | 'info' | 'warn' | 'error'

interface ImportMetaEnv {
  /**
   * 是否开启 mock 模式
   */
  readonly VITE_MOCK_ENABLED?: boolean
  readonly VITE_API_URL: string
  readonly VITE_LOG_LEVEL?: RuntimeLogLevel
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/**
 * 应用版本
 */
declare const __APP_VERSION__: string

/**
 * 应用构建时间
 */
declare const __APP_BUILD_TIME__: string
