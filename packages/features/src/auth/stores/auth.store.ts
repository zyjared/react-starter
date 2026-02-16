import type { Auth, AuthStatus, AuthUser } from '../model'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AUTH_STATUS } from '../constants'

interface AuthState {
  user: AuthUser | null
  token: string | null
  status: AuthStatus
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: AUTH_STATUS.ANONYMOUS,
}

interface AuthActions {
  setAuth: (auth: Auth | null) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    set => ({
      user: null,
      token: null,
      status: AUTH_STATUS.ANONYMOUS,
      setAuth: (auth) => {
        set(auth ?? initialState)
      },
      clearAuth: () => {
        set(initialState)
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        status: state.status,
      }),
    },
  ),
)

export function getAuthToken() {
  return useAuthStore.getState().token
}
