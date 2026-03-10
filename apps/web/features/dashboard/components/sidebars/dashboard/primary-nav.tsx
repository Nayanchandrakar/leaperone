import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@app/ui/components/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { DASHBOARD_NAV } from "@/features/dashboard/constants/dashboard/dashboard-navigation"

type PrimaryNavProps = {
  isManager: boolean
}

export function PrimaryNav({ isManager }: PrimaryNavProps) {
  const currentPath = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {DASHBOARD_NAV.map((item) => {
          if (item.managerOnly && !isManager) return null

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={currentPath === item.href}>
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
