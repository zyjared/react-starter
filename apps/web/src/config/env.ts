const MODES: RuntimeEnvironment[] = ['development', 'test', 'staging', 'production', 'local']

function getMode(mode: string): RuntimeEnvironment {
  return MODES.includes(mode as RuntimeEnvironment) ? mode as RuntimeEnvironment : 'local'
}

export const envConfig = {
  mode: getMode(import.meta.env.MODE),
  mockEnabled: import.meta.env.VITE_MOCK_ENABLED,
  apiUrl: import.meta.env.VITE_API_URL,
  logLevel: import.meta.env.VITE_LOG_LEVEL,
}

export function getEnvConfig() {
  return envConfig
}
