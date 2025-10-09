"use client"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@app/ui/components/sidebar"
import type { LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createRoute, isRouteActive } from "@/features/dashboard/utils"

type DashboardNavProps = {
  data: {
    name: string
    url: string
    icon: LucideIcon
  }[]
  workspaceId: string
}

export function DashboardNav({ data, workspaceId }: DashboardNavProps) {
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
