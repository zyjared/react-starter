import { create } from 'zustand'

export interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string
}

export interface AuthState {
  user: AuthUser | null
  token: string | null
  setUser: (user: AuthUser | null) => void
  setToken: (token: string | null) => void
  mockLogin: () => void
  logout: () => void
}

const MOCK_USER: AuthUser = {
  id: 'user_r',
  name: 'R',
  email: 'zyjared@outlook.com',
  avatar: '/vite.svg',
}

export const useAuthStore = create<AuthState>(set => ({
  user: MOCK_USER,
  token: null,
  setUser: user => set({ user }),
  setToken: token => set({ token }),
  mockLogin: () => set({ user: MOCK_USER, token: 'mock_token' }),
  logout: () => set({ user: null, token: null }),
}))

export function getAuthToken() {
  return useAuthStore.getState().token
}
