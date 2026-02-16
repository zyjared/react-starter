export class ApiError extends Error {
  readonly name = 'ApiError'
  readonly status: number
  readonly url: string
  readonly method: string
  readonly data: unknown

  constructor(params: {
    message: string
    status: number
    url: string
    method: string
    data: unknown
  }) {
    super(params.message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.status = params.status
    this.url = params.url
    this.method = params.method
    this.data = params.data
  }
}

export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError
}
