import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import type { HttpHooks } from './hooks'
import axios from 'axios'
import { createHttpError } from './error'
import { HTTP_HOOKS, setHttpHooks } from './hooks'

const defaultConfig: AxiosRequestConfig = {
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
}

type LoggerType = 'warn' | 'error'

export type HttpOptions = {
  baseURL?: string
  requestConfig?: AxiosRequestConfig
} & HttpHooks

export const client = axios.create(defaultConfig)

const config: HttpOptions & { _configured?: boolean } = { }

function logger(msg: string, type?: LoggerType) {
  type === 'warn'
    ? console.warn(msg)
    : console.error(msg)
}

export function setupHttp(options: HttpOptions = {}) {
  if (config._configured) {
    logger?.(`Http config has been setup`, 'warn')
    return
  }

  const {
    baseURL,
    requestConfig,
    ...hooks
  } = options

  if (baseURL)
    client.defaults.baseURL = baseURL

  requestConfig && Object.assign(client.defaults, requestConfig)

  setHttpHooks(hooks)

  config._configured = true
}

client.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = HTTP_HOOKS.onGetToken?.()

    if (!token)
      return config

    typeof token === 'string'
      ? (config.headers.Authorization = `Bearer ${token}`)
      : Object.assign(config.headers, token)

    return config
  },
  (error) => {
    const httpError = createHttpError(error)
    HTTP_HOOKS.onRequestError?.(httpError)

    return Promise.reject(httpError)
  },
)

client.interceptors.response.use(
  (response) => {
    return HTTP_HOOKS.onResponseSuccess?.(response) || response
  },
  (error) => {
    const httpError = createHttpError(error)

    if (error.response?.status === 401 && HTTP_HOOKS.onUnauthorized) {
      httpError.handle(HTTP_HOOKS.onUnauthorized, { force: true })
    }

    HTTP_HOOKS.onResponseError?.(httpError)

    return Promise.reject(httpError)
  },
)

export const httpClient = client
