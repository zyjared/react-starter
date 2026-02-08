import type { LayoutMenu, LayoutMenuGroup, LayoutMenuItem } from './types'
import { isActivePath } from '@/router'

export function isMenuGroup(menu: LayoutMenu): menu is Record<string, LayoutMenuGroup> {
  return !!menu && !Array.isArray(menu)
}

export function isMenuItemCollapsible(item: LayoutMenuItem): item is LayoutMenuItem & { items: LayoutMenuItem[] } {
  return Array.isArray(item.items) && item.items.length > 0
}

export function isMenuItem(item: LayoutMenuItem): item is LayoutMenuItem & { path: string } {
  return typeof item.path === 'string' && item.path.length > 0
}

export function processMenuItems(items: LayoutMenuItem[], options: {
  pathname: string
  skipActive?: boolean
}) {
  const {
    pathname,
    skipActive = false,
  } = options

  const processedItems: LayoutMenuItem[] = []
  let isActive = false // 标记本层级是否有激活项

  for (const item of items) {
    // 是否隐藏
    if (item.hidden?.(pathname))
      continue

    let processedItem: LayoutMenuItem
    if (isMenuItemCollapsible(item)) {
      processedItem = {
        ...item,
        items: processMenuItems(item.items, {
          pathname,
          skipActive: isActive || skipActive, // 已找到激活项时跳过后续检查
        }).items,
      }
      if (!processedItem.items?.length)
        continue
      processedItem.isActive = processedItem.items.some(child => child.isActive)
    }
    else if (isMenuItem(item)) {
      processedItem = {
        ...item,
        // 已找到激活项或指定跳过时不再检查
        isActive: !(isActive || skipActive) && isActivePath(item.path, pathname),
      }
    }
    else {
      continue
    }

    if (processedItem.isActive)
      isActive = true

    processedItems.push(processedItem)
  }

  return {
    items: processedItems,
    isActive, // 本层级是否有激活项
    isEmpty: !processedItems.length,
  }
}

export const menuVariant = {
  items: 'items',
  group: 'group',
}

export type MenuVariant = (typeof menuVariant)[keyof typeof menuVariant]

export interface ProcessedMenuGroup extends LayoutMenuGroup {
  key: string
}

export function processMenu(menu: LayoutMenu, options: {
  pathname: string
  variant?: MenuVariant
}) {
  const {
    pathname,
    variant,
  } = options

  if (!menu) {
    return {
      menu: [],
      variant,
    }
  }

  if (isMenuGroup(menu)) {
    const groups = Object.entries(menu)
      .map(([key, group]) => {
        const processed = processMenuItems(group.items, { pathname })
        return {
          key,
          ...group,
          items: processed.items,
          isActive: processed.isActive,
        }
      })
      .filter(group => group.items.length > 0)

    return {
      menu: groups,
      variant: menuVariant.group,
    }
  }

  if (!menu.length) {
    return {
      menu: [],
      variant,
    }
  }

  return {
    menu: processMenuItems(menu, { pathname }).items,
    variant: menuVariant.items,
  }
}
