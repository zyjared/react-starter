import type { MenuItem as MenuItemType, SidebarVariant } from '../../types'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@r/ui/primitives/collapsible'
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@r/ui/primitives/sidebar'
import { ChevronRightIcon } from 'lucide-react'
import { useMemo } from 'react'
import { SIDEBAR_VARIANT } from '@/layouts/constants'
import { isActivePath, Link, useLocation } from '@/router'

interface MenuItemWithKey extends MenuItemType {
  key: string
  items?: MenuItemWithKey[]
}

function MenuItem({ item, activeKey, isSubItem = false}: { item: MenuItemWithKey, activeKey: string, isSubItem?: boolean }) {
  const ItemComp = isSubItem ? SidebarMenuSubItem : SidebarMenuItem
  const ItemBtnComp = isSubItem ? SidebarMenuSubButton : SidebarMenuButton

  return item.items?.length
    ? (
        <Collapsible asChild defaultOpen className="group/collapsible">
          <ItemComp>
            <CollapsibleTrigger asChild>
              <ItemBtnComp tooltip={item.label}>
                {item.icon && <item.icon />}
                <span className="group-data-[collapsible=icon]:sr-only">
                  {item.label}
                </span>
                <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </ItemBtnComp>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map(item => (
                  <MenuItem key={item.key} item={item} activeKey={activeKey} isSubItem={true} />
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </ItemComp>
        </Collapsible>
      )
    : ((
        <ItemComp>
          <ItemBtnComp asChild tooltip={item.label} isActive={activeKey.startsWith(item.key)}>
            <Link to={item.path || '#'}>
              { item.icon && <item.icon />}
              <span className="group-data-[collapsible=icon]:sr-only">
                {item.label}
              </span>
            </Link>
          </ItemBtnComp>
        </ItemComp>
      ))
}

function Menus({ items, activeKey}: { items: MenuItemWithKey[], activeKey: string }) {
  return (
    <SidebarMenu className="gap-1">
      {
        items.map(item => (
          <MenuItem key={item.key} item={item} activeKey={activeKey} />
        ))
      }
    </SidebarMenu>
  )
}

function normalizeMenus(menus: MenuItemType[], parentId = '') {
  const res: MenuItemWithKey[] = []

  for (const item of menus) {
    const { items, ...rest } = item

    // 固定 key，同时方便直接通过前缀判断是否激活或展开
    const id = `${rest.id}+` // 防止错误匹配
    const key = (parentId ? `${parentId}-${id}` : id)

    const it: MenuItemWithKey = { ...rest, key }
    if (items?.length) {
      it.items = normalizeMenus(items, key)
    }

    res.push(it)
  }

  return res
}

function findMenuByPath(menus: MenuItemWithKey[], currentPath: string): MenuItemWithKey | null {
  for (const item of menus) {
    const res = item.items?.length && findMenuByPath(item.items, currentPath)
    if (res) {
      return res
    }

    if (item.path && isActivePath(item.path, currentPath)) {
      return item
    }
  }

  return null
}

export function AppSidebarMenus({ menus, variant = SIDEBAR_VARIANT.GROUP }: { menus: MenuItemType[], variant?: SidebarVariant }) {
  const location = useLocation()

  const normalizedMenus = useMemo(
    () => normalizeMenus(menus),
    [menus],
  )
  const currentActiveItem = useMemo(
    () => findMenuByPath(normalizedMenus, location.pathname),
    [normalizedMenus, location],
  )
  const activeMenuKey = currentActiveItem?.key || ''

  const filteredGroup = useMemo(
    () => {
      if (variant === SIDEBAR_VARIANT.COLLAPSIBLE)
        return { items: normalizedMenus }

      const items: MenuItemWithKey[] = []
      const groups: MenuItemWithKey[] = []

      for (const item of normalizedMenus) {
        item.items?.length
          ? groups.push(item)
          : items.push(item)
      }

      return { groups, items }
    },
    [normalizedMenus, variant],
  )

  return (
    <>
      {filteredGroup.items?.length && (
        <SidebarGroup>
          <SidebarGroupContent>
            <Menus items={filteredGroup.items} activeKey={activeMenuKey} />
          </SidebarGroupContent>
        </SidebarGroup>
      )}

      {filteredGroup.groups?.length && (

        filteredGroup.groups.map(item => (
          item.items?.length
          && (
            <SidebarGroup key={item.key}>
              <SidebarGroupLabel>
                { item.label }
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <Menus items={item.items} activeKey={activeMenuKey} />
              </SidebarGroupContent>
            </SidebarGroup>
          )
        ))

      )}
    </>
  )
}
