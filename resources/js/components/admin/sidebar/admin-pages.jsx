
import { Link } from "@inertiajs/react"

import { Button } from "@/components/ui/button"
import { 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

export function AdminPages({
    groups,
}) {
  return (
    <SidebarContent>
      {groups?.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.pages.map((page) => (
                  <SidebarMenuItem key={page.url}>
                  <SidebarMenuButton
                    asChild
                    isActive={route().current(page.url)}
                  >
                    <Link href={route(page.url)}>
                      <page.icon />
                      <Button variant="icon">{page.title}</Button>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  )
}