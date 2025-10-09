"use client"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@app/ui/components/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { DashboardNavMain } from "@/features/dashboard/types"
import { createRoute, isRouteActive } from "@/features/dashboard/utils"

type DashboardNavGroupProps = {
  data: DashboardNavMain[]
  workspaceId: string
}

export const DashboardNavGroup = ({
  data,
  workspaceId,
}: DashboardNavGroupProps) => {
  const currentPath = usePathname()

  return (
    <SidebarGroup>
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
