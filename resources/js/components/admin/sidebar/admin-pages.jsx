
import { Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function AdminPages({
    items,
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Manager Panel</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <Button variant="icon">{item.title}</Button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          ))}
        </SidebarMenu>
    </SidebarGroup>
  )
}