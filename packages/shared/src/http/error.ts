import type { AxiosError as AxiosErrorType } from 'axios'
import { AxiosError } from 'axios'

interface HttpErrorHandleOptions {
  /**
   * 即使已经处理，依然执行
   */
  force?: boolean
}

export class HttpError<T = unknown, D = any> extends AxiosError<T, D> {
  /**
   * 处理次数
   */
  hc: number

  constructor(error: AxiosErrorType<T, D> | unknown) {
    const err = error instanceof AxiosError
      ? error
      : { message: error instanceof Error ? error.message : 'Unknown Error' } as any

    super(
      err.message,
      err.code,
      err.config,
      err.request,
      err.response,
    )

    this.hc = 0
  }

  /**
   * 是否已处理
   */
  get handled(): boolean {
    return this.hc > 0
  }

  /**
   * 处理错误并标记为已处理
   */
  public handle(callback: (error: HttpError<T, D>) => void, options?: HttpErrorHandleOptions) {
    if (this.handled && !options?.force)
      return

    callback(this)
    this.hc++
  }
}

export function createHttpError<T = unknown, D = any>(error: AxiosErrorType<T, D>): HttpError<T, D> {
  return new HttpError(error)
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError
}
