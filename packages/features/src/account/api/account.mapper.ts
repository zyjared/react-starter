import type { Account } from '../model'
import type { AccountDto } from './account.dto'

export function toAccount(data: AccountDto): Account {
  return data
}
