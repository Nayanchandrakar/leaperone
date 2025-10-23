"use client"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@app/ui/components/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { SidebarNavItems } from "@/features/dashboard/types"
import { createRoute, isRouteActive } from "@/features/dashboard/utils"

type DashboardNavMainProps = {
  data: SidebarNavItems[]
  workspaceId: string
}

export const DashboardNavMain = ({ data, workspaceId }: DashboardNavMainProps) => {
  const currentPath = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {data?.map((item) => {
          const href = createRoute(`${workspaceId}/${item.url}`)
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={isRouteActive({
                  currentPath: currentPath,
                  targetPath: href,
                  depth: 2,
                })}
              >
                <Link href={href}>
                  <item.icon />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
