import type { AuthUser } from '../model/auth.store'
import { client } from '@/shared/api'

const AUTH_BASE = '/auth'

export interface AuthLoginRequest {
  email: string
  password: string
}

export interface AuthLoginResponse {
  token: string
  user: AuthUserDto
}

export interface AuthSessionResponse {
  user: AuthUserDto
  token?: string | null
}

export interface AuthUserDto {
  id: string
  name: string
  email: string
  avatar?: string | null
}

function mapAuthUser(dto: AuthUserDto): AuthUser {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    avatar: dto.avatar ?? '',
  }
}

export async function login(payload: AuthLoginRequest) {
  const data = await client.post<AuthLoginResponse>(`${AUTH_BASE}/login`, payload)
  return {
    token: data.token,
    user: mapAuthUser(data.user),
  }
}

export async function getSession() {
  const data = await client.get<AuthSessionResponse>(`${AUTH_BASE}/session`)
  return {
    token: data.token ?? null,
    user: mapAuthUser(data.user),
  }
}

export async function logout() {
  await client.post(`${AUTH_BASE}/logout`)
}
