"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@app/ui/components/sidebar"
import type * as React from "react"
import { HeaderLogo } from "@/components/ui/header"
import { DashboardNav } from "@/features/dashboard/components/sidebars/dashboard/dashboard-nav"
import { DASHBOARD_NAV_MAIN } from "@/features/dashboard/constants/dashboard/navigation"

type DashboardSidebarProps = React.ComponentProps<typeof Sidebar>

export function DashboardSidebar(props: DashboardSidebarProps) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="items-center py-0.5">
        <HeaderLogo className="fill-primary" />
      </SidebarHeader>
      <SidebarContent>
        <DashboardNav
          data={DASHBOARD_NAV_MAIN}
          workspaceId={"ggi2dt2bg6emryl1py5zmmwf"}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
