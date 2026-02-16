import type { Auth } from '../model'
import type { AuthResponseDto } from './auth.dto'
import { AUTH_STATUS } from '../constants'

export function toAuth(data: AuthResponseDto | null): Auth {
  return data
    ? {
        ...data,
        status: AUTH_STATUS.AUTHENTICATED,
      }
    : {
        user: null,
        token: null,
        status: AUTH_STATUS.ANONYMOUS,
      }
}
