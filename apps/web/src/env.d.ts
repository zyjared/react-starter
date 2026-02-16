/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * 是否开启 mock 模式
   */
  readonly VITE_USE_MOCK: boolean
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
