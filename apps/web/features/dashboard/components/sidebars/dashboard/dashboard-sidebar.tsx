"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@app/ui/components/sidebar"
import type * as React from "react"
import { DashboardNav } from "@/features/dashboard/components/sidebars/dashboard/dashboard-nav"

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar>

export function DashboardSidebar(props: DashboardSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <DashboardNav />
      </SidebarContent>
      <SidebarFooter className="p-0">sidebar footer content</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
