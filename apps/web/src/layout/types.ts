import type { LucideIcon } from 'lucide-react'

export interface LayoutMenuItem {
  label: string
  icon?: LucideIcon
  hidden?: (pathname: string) => boolean
  path?: string
  items?: LayoutMenuItem[]
  /**
   * @inner
   */
  isActive?: boolean
}

export interface LayoutMenuGroup {
  text: string
  icon?: LucideIcon
  items: LayoutMenuItem[]
  /**
   * @inner
   */
  isGroup?: boolean
}

export type LayoutMenu = Record<string, LayoutMenuGroup> | LayoutMenuItem[]

export interface LayoutConfig {
  logo?: LucideIcon
  title?: string
  subtitle?: string

  // actions?: LayoutMenuAction[]
  menu?: LayoutMenu
  variant?: 'sidebar' | 'floating' | 'inset'
}
