import type { RuntimeConfig } from './schema'
import { getEnvConfig } from './env'

const envConfig = getEnvConfig()

const runtimeConfig: RuntimeConfig = {
  env: envConfig.mode,
  api: {
    defaultEndpoint: 'default',
    endpoints: [
      {
        name: 'default',
        baseUrl: envConfig.apiUrl ?? '/api',
      },
    ],
  },
  observability: {
    logLevel: envConfig.logLevel,
  },
  features: {

  },
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  ...(window?.__APP_RUNTIME_CONFIG__ ?? {}),
}

export function getRuntimeConfig(): RuntimeConfig {
  return runtimeConfig
}
