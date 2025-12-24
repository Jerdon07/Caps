
import NavHeader from "@/components/sidebar/nav-header";
import NavUser from "@/components/sidebar/nav-user";
import { PageProps } from "@/types";

import { usePage } from "@inertiajs/react";
import { AdminPages } from "@/components/admin/sidebar/admin-pages";
import { Sprout } from "lucide-react";
import { SquareUser } from "lucide-react";
import { 
    Sidebar, 
    SidebarContent, 
    SidebarFooter,
    SidebarHeader 
} from "@/components/ui/sidebar";

const pages = [{
    title: "Crops Dashboard",
    url: "/admin/crops",
    icon: Sprout,
    isActive: true
}, {
    title: "Farmers Dashboard",
    url: "/admin/farmers",
    icon: SquareUser,
}]

export default function AdminSidebar({
    user,
    ...props
 }) {
    const { auth } = usePage<PageProps>().props

    return (
        <Sidebar collapsible="icon" {...props} variant="inset">
            <SidebarHeader>
                <NavHeader link={'admin'} />
            </SidebarHeader>

            <SidebarContent>
                <AdminPages items={pages} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={auth?.user} />
            </SidebarFooter>
        </Sidebar>
    )
}