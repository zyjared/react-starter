import type { MessageDescriptor } from '@lingui/core'
import type { LayoutMenu, LayoutMenuItem, ProcessedLayoutMenuItem } from './types'
import { isActivePath } from '@/router'

type MenuItem = LayoutMenuItem | ProcessedLayoutMenuItem

type ProcessedMenuItem = ProcessedLayoutMenuItem

function tryGetText(text?: string | MessageDescriptor) {
  if (!text)
    return ''

  return typeof text === 'object'
    ? text.message || ''
    : text
}

export function isMenuItemCollapsible<T extends MenuItem | ProcessedMenuItem>(item: T): item is T & { items: T[] } {
  return Array.isArray(item.items) && item.items.length > 0
}

export function isMenuItem<T extends MenuItem | ProcessedMenuItem>(item: T): item is T & { path: string } {
  return typeof item.path === 'string' && item.path.length > 0
}

export function processMenuItems(items: MenuItem[], options: {
  pathname: string
  skipActive?: boolean
  translate?: (text?: string | MessageDescriptor) => (string | undefined)
}) {
  const {
    pathname,
    skipActive = false,
    translate,
  } = options

  const processedItems: ProcessedMenuItem[] = []
  let isActive = false // 标记本层级是否有激活项

  for (const item of items) {
    // 是否隐藏
    if (item.hidden?.(pathname))
      continue

    let processedItem: ProcessedMenuItem | undefined
    if (isMenuItemCollapsible(item)) {
      const {
        items: childItems,
        isActive: childIsActive,
        isEmpty,
      } = processMenuItems(item.items, {
        pathname,
        skipActive: isActive || skipActive, // 已找到激活项时跳过后续检查
        translate,
      })

      if (isEmpty) {
        continue
      }

      const text = translate?.(item.text) || tryGetText(item.text)
      processedItem = {
        ...item,
        text,
        items: childItems,
        isActive: childIsActive,
      }
    }
    else if (isMenuItem(item)) {
      const text = translate?.(item.text) || tryGetText(item.text)
      processedItem = {
        ...(item as ProcessedMenuItem),
        text,
        // 已找到激活项或指定跳过时不再检查
        isActive: !(isActive || skipActive) && isActivePath(item.path, pathname),
      }
    }

    if (!processedItem)
      continue

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

export function processMenu(menu: LayoutMenu | undefined, options: {
  pathname: string
  variant?: MenuVariant
  translate?: (text?: string | MessageDescriptor) => (string | undefined)
}): {
  items: ProcessedMenuItem[]
  variant?: MenuVariant
} {
  const {
    pathname,
    variant,
    translate,
  } = options

  if (!menu) {
    return {
      items: [] as ProcessedMenuItem[],
      variant,
    }
  }

  if (Array.isArray(menu)) {
    if (!menu.length) {
      return {
        items: [] as ProcessedMenuItem[],
        variant,
      }
    }

    return {
      items: processMenuItems(menu, { pathname, translate }).items,
      variant: menuVariant.items,
    }
  }

  const groups = []
  for (const [key, group] of Object.entries(menu)) {
    const its = group.items
    if (!its?.length)
      continue

    const processed = processMenuItems(its, { pathname, translate })
    if (processed.isEmpty)
      continue

    const text = translate?.(group.text) || tryGetText(group.text)
    groups.push({
      ...group,
      text,
      key,
      items: processed.items,
      isActive: processed.isActive,
    })
  }

  return {
    items: groups,
    variant: menuVariant.group,
  }
}
