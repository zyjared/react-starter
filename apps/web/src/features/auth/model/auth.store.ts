import type { AuthLoginRequest } from '../api'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { login as apiLogin, logout as apiLogout } from '../api'

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  login: (payload: AuthLoginRequest) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      login: async (payload) => {
        const { user, token } = await apiLogin(payload)
        set({ user, token })
      },
      logout: async () => {
        try {
          await apiLogout()
        }
        finally {
          set({ user: null, token: null })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({ user: state.user, token: state.token }),
    },
  ),
)

export function getAuthToken() {
  return useAuthStore.getState().token
}
