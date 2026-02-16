import type { Auth } from '../model'
import type { AuthResponseDto, SignInPayload } from './auth.dto'
import { httpClient } from '@kit/shared'
import { toAuth } from './auth.mapper'

const AUTH_ENDPOINT = '/auth'

export async function signIn(payload: SignInPayload): Promise<Auth> {
  const { data } = await httpClient.post<AuthResponseDto>(`${AUTH_ENDPOINT}/login`, payload)
  return toAuth(data)
}

export async function getCurrentAuth(): Promise<Auth> {
  const { data } = await httpClient.get<AuthResponseDto>(`${AUTH_ENDPOINT}/session`)
  return toAuth(data)
}

export async function signOut(): Promise<void> {
  await httpClient.post(`${AUTH_ENDPOINT}/logout`)
}
