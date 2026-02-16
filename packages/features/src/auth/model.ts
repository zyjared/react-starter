import type { AUTH_STATUS } from './constants'

export type AuthStatus = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS]

export interface AuthUser {
  id: string
  username: string
  avatar: string
}

export interface Auth {
  user: AuthUser | null
  token: string | null
  status: AuthStatus
}
