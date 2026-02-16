import { useQuery } from '@tanstack/react-query'
import * as api from '../api/auth.api'
import { useAuthStore } from '../stores/auth.store'
import { authKeys } from './keys'

export function useAuthSession() {
  return useQuery({
    queryKey: authKeys.session(),
    queryFn: async () => {
      try {
        const auth = await api.getCurrentAuth()
        useAuthStore.getState().setAuth(auth)
        return auth
      }
      catch (error) {
        useAuthStore.getState().clearAuth()
        throw error
      }
    },
    retry: false,
  })
}
