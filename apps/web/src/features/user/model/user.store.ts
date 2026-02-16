import { create } from 'zustand'

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  role?: string
  locale?: string
}

export interface UserState {
  profile: UserProfile | null
  setProfile: (profile: UserProfile | null) => void
  clearProfile: () => void
}

export const useUserStore = create<UserState>(set => ({
  profile: null,
  setProfile: profile => set({ profile }),
  clearProfile: () => set({ profile: null }),
}))

export function getUserId() {
  return useUserStore.getState().profile?.id ?? null
}
