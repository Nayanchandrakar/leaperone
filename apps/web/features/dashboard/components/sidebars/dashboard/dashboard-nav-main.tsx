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
import type { DashboardNavMainItem } from "@/features/dashboard/types"
import { createRoute, isRouteActive } from "@/features/dashboard/utils"

type DashboardNavMainProps = {
  items: DashboardNavMainItem[]
  workspaceId: string
}

export const DashboardNavMain = ({ items, workspaceId }: DashboardNavMainProps) => {
  const currentPath = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items?.map((item) => {
          const href = createRoute(`${workspaceId}/${item.url}`)
          return (
            <SidebarMenuItem key={item.title}>
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
