import { useQuery } from '@tanstack/react-query'
import * as api from '../api/account.api'
import { useAccountStore } from '../stores/account.store'
import { accountKeys } from './keys'

export function useCurrentAccount() {
  return useQuery({
    queryKey: accountKeys.current(),
    queryFn: async () => {
      const account = await api.getCurrentAccount()
      useAccountStore.getState().setAccount(account)
      return account
    },
  })
}
