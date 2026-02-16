import type { LucideIcon } from 'lucide-react'
import type { SIDEBAR_VARIANT } from './constants'

export type LayoutType = 'default' | 'chat'
export type SidebarVariant = typeof SIDEBAR_VARIANT[keyof typeof SIDEBAR_VARIANT]

/**
 * 菜单项
 */
export interface MenuItem {
  id: string
  label: string
  path?: string
  icon?: LucideIcon
  badge?: number
  /**
   * 子项
   */
  items?: MenuItem[]
}

/**
 * 用户信息
 */
export interface UserProfile {
  id?: string
  name: string
  avatar: string
  description?: string
}
