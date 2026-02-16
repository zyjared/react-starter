import type { Account } from '../model'
import type { AccountDto } from './account.dto'
import { httpClient } from '@kit/shared'
import { toAccount } from './account.mapper'

export async function getCurrentAccount(): Promise<Account> {
  const { data } = await httpClient.get<AccountDto>('/users/me')
  return toAccount(data)
}
