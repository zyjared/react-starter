import type { HttpClient, HttpClientConfig, QueryParams, ResponseType, SignedUrlUploadOptions, UploadProgressHandler } from './types'
import { ApiError } from './error'

function isAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url)
}

function joinBaseUrl(baseUrl: string | undefined, path: string) {
  if (!baseUrl)
    return path
  if (isAbsoluteUrl(path))
    return path

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path
  return `${normalizedBase}${normalizedPath}`
}

function applyQuery(url: URL, query: QueryParams | undefined) {
  if (!query)
    return
  for (const [key, value] of Object.entries(query)) {
    if (value == null)
      continue
    if (Array.isArray(value)) {
      for (const v of value) {
        url.searchParams.append(key, String(v))
      }
      continue
    }
    url.searchParams.set(key, String(value))
  }
}

function resolveUrl(urlOrPath: string, baseUrl?: string) {
  const joined = joinBaseUrl(baseUrl, urlOrPath)
  if (isAbsoluteUrl(joined))
    return new URL(joined)
  const origin = globalThis.location?.origin ?? 'http://localhost'
  return new URL(joined, origin)
}

function mergeHeaders(base: HeadersInit | undefined, extra: HeadersInit | undefined) {
  const headers = new Headers(base ?? {})
  if (extra)
    new Headers(extra).forEach((value, key) => headers.set(key, value))
  return headers
}

function headersFromXhr(xhr: XMLHttpRequest) {
  const headers = new Headers()
  const raw = xhr.getAllResponseHeaders()
  for (const line of raw.split('\r\n')) {
    const index = line.indexOf(':')
    if (index <= 0)
      continue
    const key = line.slice(0, index).trim()
    const value = line.slice(index + 1).trim()
    if (key)
      headers.append(key, value)
  }
  return headers
}

function xhrResponseType(type: ResponseType) {
  if (type === 'arrayBuffer')
    return 'arraybuffer'
  if (type === 'blob')
    return 'blob'
  return 'text'
}

function xhrBodyForResponse(xhr: XMLHttpRequest, responseType: ResponseType) {
  const type = xhrResponseType(responseType)
  if (type === 'arraybuffer' || type === 'blob')
    return xhr.response
  return xhr.responseText
}

function reportUploadProgress(handler: UploadProgressHandler, ev: ProgressEvent<EventTarget>) {
  const loaded = ev.loaded ?? 0
  const total = ev.lengthComputable ? ev.total : undefined
  const percent = total && total > 0 ? loaded / total : undefined
  handler({ loaded, total, percent })
}

async function requestRawWithXhr(params: {
  url: string
  method: string
  headers: Headers
  body: any
  responseType: ResponseType
  signal?: AbortSignal
  onUploadProgress?: UploadProgressHandler
}): Promise<Response> {
  const xhr = new XMLHttpRequest()
  xhr.open(params.method, params.url, true)
  xhr.responseType = xhrResponseType(params.responseType)

  params.headers.forEach((value, key) => xhr.setRequestHeader(key, value))

  if (params.onUploadProgress)
    xhr.upload.onprogress = ev => reportUploadProgress(params.onUploadProgress!, ev)

  const abort = () => xhr.abort()
  if (params.signal) {
    if (params.signal.aborted) {
      abort()
    }
    else {
      params.signal.addEventListener('abort', abort, { once: true })
    }
  }

  return await new Promise((resolve, reject) => {
    xhr.onerror = () => reject(new Error(`Network error: ${params.method} ${params.url}`))
    xhr.onabort = () => reject(new DOMException('Aborted', 'AbortError'))
    xhr.onload = () => {
      const headers = headersFromXhr(xhr)
      const body = xhrBodyForResponse(xhr, params.responseType)
      resolve(new Response(body, { status: xhr.status, statusText: xhr.statusText, headers }))
    }
    xhr.send(params.body)
  })
}

function createAbortSignal(params: {
  timeoutMs: number
  signal?: AbortSignal
}) {
  const controller = new AbortController()
  let timedOut = false
  let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined
  if (params.timeoutMs > 0) {
    timeoutId = globalThis.setTimeout(() => {
      timedOut = true
      controller.abort()
    }, params.timeoutMs)
  }

  if (params.signal) {
    if (params.signal.aborted) {
      controller.abort()
    }
    else {
      params.signal.addEventListener('abort', () => controller.abort(), { once: true })
    }
  }

  return {
    signal: controller.signal,
    timedOut: () => timedOut,
    cleanup: () => {
      if (timeoutId != null)
        globalThis.clearTimeout(timeoutId)
    },
  }
}

function getResponseTypeFromHeaders(headers: Headers, fallback: ResponseType) {
  const contentType = headers.get('content-type') ?? ''
  if (fallback !== 'json')
    return fallback
  if (contentType.includes('application/json') || contentType.includes('+json'))
    return 'json'
  return 'text'
}

async function parseResponse(res: Response, responseType: ResponseType) {
  if (responseType === 'raw')
    return res
  if (res.status === 204)
    return undefined

  const resolved = getResponseTypeFromHeaders(res.headers, responseType)
  if (resolved === 'json') {
    const text = await res.text()
    if (!text)
      return undefined
    try {
      return JSON.parse(text)
    }
    catch {
      return text
    }
  }
  if (resolved === 'text')
    return res.text()
  if (resolved === 'blob')
    return res.blob()
  if (resolved === 'arrayBuffer')
    return res.arrayBuffer()
  return res
}

function inferBodyAndHeaders(body: unknown, headers: Headers) {
  if (body == null)
    return { body: undefined as unknown }

  if (body instanceof FormData)
    return { body }
  if (body instanceof Blob)
    return { body }
  if (body instanceof ArrayBuffer)
    return { body }
  if (body instanceof URLSearchParams)
    return { body }
  if (typeof body === 'string')
    return { body }

  const hasContentType = headers.has('content-type')
  if (!hasContentType)
    headers.set('content-type', 'application/json')
  return { body: JSON.stringify(body) }
}

async function buildError(res: Response, url: string, method: string) {
  let data: unknown
  try {
    data = await parseResponse(res.clone(), 'json')
  }
  catch {
    try {
      data = await res.clone().text()
    }
    catch {
      data = undefined
    }
  }
  const message = `Request failed: ${method} ${url} (${res.status})`
  return new ApiError({
    message,
    status: res.status,
    url,
    method,
    response: res,
    data,
  })
}

export function createHttpClient(config: HttpClientConfig = {}): HttpClient {
  const fetchImpl = config.fetchImpl ?? fetch
  const tokenHeader = config.tokenHeader ?? 'authorization'
  const tokenPrefix = config.tokenPrefix ?? 'Bearer'

  const requestRaw: HttpClient['requestRaw'] = async (path, options = {}) => {
    const method = (options.method ?? 'GET').toUpperCase()
    const url = resolveUrl(path, config.baseUrl)
    applyQuery(url, options.query)

    const responseType = options.responseType ?? 'json'
    const defaultHeaders = options.skipDefaultHeaders
      ? undefined
      : responseType === 'json'
        ? { accept: 'application/json' }
        : undefined
    const headers = mergeHeaders(defaultHeaders, options.headers)
    const authEnabled = options.auth ?? true
    if (authEnabled && config.getToken) {
      const token = config.getToken()
      if (token) {
        const value = tokenPrefix ? `${tokenPrefix} ${token}` : token
        if (!headers.has(tokenHeader))
          headers.set(tokenHeader, value)
      }
    }

    const hasBody = method !== 'GET' && method !== 'HEAD'
    const inferred = hasBody ? inferBodyAndHeaders(options.body, headers) : { body: undefined }

    const timeoutMs = options.timeoutMs ?? 30_000
    const abort = createAbortSignal({ timeoutMs, signal: options.signal })

    try {
      if (options.onUploadProgress && inferred.body != null) {
        let res: Response
        try {
          res = await requestRawWithXhr({
            url: url.toString(),
            method,
            headers,
            body: inferred.body as any,
            responseType,
            signal: abort.signal,
            onUploadProgress: options.onUploadProgress,
          })
        }
        catch (error) {
          const name = (error as any)?.name
          if (name === 'AbortError' && abort.timedOut())
            throw new Error(`Request timeout: ${method} ${url.toString()}`)
          throw error
        }

        if (res.status === 401 && config.onUnauthorized)
          config.onUnauthorized(res)

        if (!res.ok)
          throw await buildError(res, url.toString(), method)

        return res
      }

      let res: Response
      try {
        res = await fetchImpl(url.toString(), {
          method,
          headers,
          body: inferred.body as any,
          signal: abort.signal,
        })
      }
      catch (error) {
        const name = (error as any)?.name
        if (name === 'AbortError' && abort.timedOut())
          throw new Error(`Request timeout: ${method} ${url.toString()}`)
        throw error
      }

      if (res.status === 401 && config.onUnauthorized)
        config.onUnauthorized(res)

      if (!res.ok)
        throw await buildError(res, url.toString(), method)

      return res
    }
    finally {
      abort.cleanup()
    }
  }

  const request: HttpClient['request'] = async (path, options = {}) => {
    const res = await requestRaw(path, options)
    const responseType = options.responseType ?? 'json'
    return parseResponse(res, responseType) as Promise<any>
  }

  return {
    request,
    requestRaw,
    get: (path, options) => request(path, { ...options, method: 'GET' }),
    post: (path, body, options) => request(path, { ...options, method: 'POST', body }),
    put: (path, body, options) => request(path, { ...options, method: 'PUT', body }),
    patch: (path, body, options) => request(path, { ...options, method: 'PATCH', body }),
    delete: (path, options) => request(path, { ...options, method: 'DELETE' }),
    postForm: (path, formData, options) => request(path, { ...options, method: 'POST', body: formData }),
    putForm: (path, formData, options) => request(path, { ...options, method: 'PUT', body: formData }),
    uploadToSignedUrl: async (url, file, options: SignedUrlUploadOptions = {}) => {
      const method = options.method ?? 'PUT'
      const headers = mergeHeaders(options.headers, undefined)
      if (options.contentType && !headers.has('content-type'))
        headers.set('content-type', options.contentType)
      return requestRaw(url, {
        method,
        headers,
        body: file,
        timeoutMs: options.timeoutMs,
        signal: options.signal,
        auth: false,
        onUploadProgress: options.onUploadProgress,
        skipDefaultHeaders: true,
        responseType: 'raw',
      })
    },
  }
}

let defaultClient: HttpClient | null = null

export function configureHttpClient(config: HttpClientConfig) {
  defaultClient = createHttpClient(config)
}

export function http() {
  if (!defaultClient)
    defaultClient = createHttpClient()
  return defaultClient
}
