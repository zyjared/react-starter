import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/auth.api'
import { useAuthStore } from '../stores/auth.store'
import { authKeys } from './keys'

export function useSignOut() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: api.signOut,
    onSettled: () => {
      queryClient.removeQueries({ queryKey: authKeys.all })
      useAuthStore.getState().clearAuth()
    },
  })
}
