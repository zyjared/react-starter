import type { MessageDescriptor } from '@lingui/core'
import type { LucideIcon } from 'lucide-react'

export interface LayoutMenuItem {
  key: string
  text?: string | MessageDescriptor
  icon?: LucideIcon
  hidden?: (pathname: string) => boolean
  path?: string
  items?: LayoutMenuItem[]
}

export interface LayoutMenuGroup {
  text?: string | MessageDescriptor
  icon?: LucideIcon
  items?: LayoutMenuItem[]
}

export type LayoutMenu = Record<string, LayoutMenuGroup> | LayoutMenuItem[]

export interface LayoutUserAction {
  key: string
  text: string | MessageDescriptor
  icon?: LucideIcon
  onClick?: () => void
}

export interface LayoutConfig {
  logo?: LucideIcon
  title?: string | MessageDescriptor
  subtitle?: string | MessageDescriptor

  menu?: LayoutMenu
  userActions?: LayoutUserAction[]
  variant?: 'sidebar' | 'floating' | 'inset'
}

// ------------------------------------------------------------------
// @inner
// ------------------------------------------------------------------

export interface ProcessedLayoutMenuItem extends LayoutMenuItem {
  isActive?: boolean
  text: string
  key: string
  items?: ProcessedLayoutMenuItem[]
}

export interface ProcessedLayoutUserAction extends LayoutUserAction {
  key: string
  text: string

}

export interface ProcessedLayoutConfig extends Omit<LayoutConfig, 'menu' | 'userActions'> {
  title?: string
  subtitle?: string
  menu?: {
    items: ProcessedLayoutMenuItem[]
    variant?: string
  }
  userActions?: ProcessedLayoutUserAction[]
}
