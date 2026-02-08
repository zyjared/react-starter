export type HttpMethod
  = | 'GET'
    | 'POST'
    | 'PUT'
    | 'PATCH'
    | 'DELETE'
    | 'HEAD'
    | 'OPTIONS'

export type QueryValue = string | number | boolean

export type QueryParams = Record<
  string,
  QueryValue | QueryValue[] | null | undefined
>

export type ResponseType = 'json' | 'text' | 'blob' | 'arrayBuffer' | 'raw'

export interface UploadProgress {
  loaded: number
  total?: number
  percent?: number
}

export type UploadProgressHandler = (progress: UploadProgress) => void

export interface HttpClientConfig {
  baseUrl?: string
  getToken?: () => string | null | undefined
  tokenHeader?: string
  tokenPrefix?: string
  onUnauthorized?: (response: Response) => void
  fetchImpl?: typeof fetch
}

export interface RequestOptions {
  method?: HttpMethod
  query?: QueryParams
  headers?: HeadersInit
  body?: unknown
  responseType?: ResponseType
  timeoutMs?: number
  signal?: AbortSignal
  auth?: boolean
  onUploadProgress?: UploadProgressHandler
  skipDefaultHeaders?: boolean
}

export interface SignedUrlUploadOptions {
  method?: 'PUT' | 'POST'
  headers?: HeadersInit
  contentType?: string
  timeoutMs?: number
  signal?: AbortSignal
  onUploadProgress?: UploadProgressHandler
}

export interface HttpClient {
  request: <T = unknown>(path: string, options?: RequestOptions) => Promise<T>
  requestRaw: (path: string, options?: RequestOptions) => Promise<Response>
  get: <T = unknown>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) => Promise<T>
  post: <T = unknown>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) => Promise<T>
  put: <T = unknown>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) => Promise<T>
  patch: <T = unknown>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) => Promise<T>
  delete: <T = unknown>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) => Promise<T>
  postForm: <T = unknown>(path: string, formData: FormData, options?: Omit<RequestOptions, 'method' | 'body'>) => Promise<T>
  putForm: <T = unknown>(path: string, formData: FormData, options?: Omit<RequestOptions, 'method' | 'body'>) => Promise<T>
  uploadToSignedUrl: (url: string, file: Blob, options?: SignedUrlUploadOptions) => Promise<Response>
}
