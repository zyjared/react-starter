import type { SignInPayload } from '../api/auth.dto'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/auth.api'
import { useAuthStore } from '../stores/auth.store'
import { authKeys } from './keys'

export function useSignIn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: SignInPayload) => api.signIn(payload),
    onSuccess: (session) => {
      queryClient.setQueryData(authKeys.session(), session)
      useAuthStore.getState().setAuth(session)
    },
  })
}
