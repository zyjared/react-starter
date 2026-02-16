import type { AxiosRequestHeaders, AxiosResponse } from 'axios'
import type { HttpError } from './error'

export interface HttpHooks<T = any> {
  onGetToken?: () => string | AxiosRequestHeaders | null | undefined
  /**
   * 当返回 401 错误时调用。
   * 也可以在 onRequestError 中处理
   */
  onUnauthorized?: (error: HttpError) => void

  onRequestError?: (error: HttpError) => void

  /**
   * 可以对响应数据进行处理
   */
  onResponseSuccess?: (response: AxiosResponse) => T
  onResponseError?: (error: HttpError) => void
}

export const HTTP_HOOKS: HttpHooks = {}

export function setHttpHooks(hooks: HttpHooks) {
  Object.assign(HTTP_HOOKS, hooks)
}
