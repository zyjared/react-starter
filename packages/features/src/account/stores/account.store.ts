import type { Account } from '../model'
import { create } from 'zustand'

interface AccountState {
  account: Account | null
}

interface AccountActions {
  setAccount: (account: Account | null) => void
  clearAccount: () => void
}

const initialState: AccountState = {
  account: null,
}

export const useAccountStore = create<AccountState & AccountActions>()(
  set => ({
    account: null,
    setAccount: (account) => {
      set({ account })
    },
    clearAccount: () => {
      set(initialState)
    },
  }),
)
