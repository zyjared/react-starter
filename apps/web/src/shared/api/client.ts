import type { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { ApiError } from './error'

// Default config
const config: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
}

const axiosInstance = axios.create(config)

type TokenGetter = () => string | null | undefined
type UnauthorizedHandler = () => void

let getToken: TokenGetter | null = null
let onUnauthorized: UnauthorizedHandler | null = null

export function configureClient(options: {
  getToken?: TokenGetter
  onUnauthorized?: UnauthorizedHandler
}) {
  if (options.getToken)
    getToken = options.getToken
  if (options.onUnauthorized)
    onUnauthorized = options.onUnauthorized
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (getToken) {
      const token = getToken()
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error: unknown) => {
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && onUnauthorized) {
      onUnauthorized()
    }

    const apiError = new ApiError({
      message: error.message || 'An unexpected error occurred',
      status: error.response?.status || 500,
      url: error.config?.url || '',
      method: error.config?.method || '',
      data: error.response?.data,
    })

    return Promise.reject(apiError)
  },
)

export const client = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<T>(url, config) as Promise<T>,
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(url, data, config) as Promise<T>,
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(url, data, config) as Promise<T>,
  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(url, data, config) as Promise<T>,
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(url, config) as Promise<T>,
}
