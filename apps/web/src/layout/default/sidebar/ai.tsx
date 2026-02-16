'use client'

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@r/ui/primitives/sidebar'
import { Link } from '@/router'

export function AiSidebarGroupChats() {
  const chats: {
    label: string
    url: string
  }[] = []
  return (
    <SidebarGroup>
      <SidebarMenu>
        {chats.map(item => (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton asChild tooltip={item.label}>
              <Link to={item.url}>
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
