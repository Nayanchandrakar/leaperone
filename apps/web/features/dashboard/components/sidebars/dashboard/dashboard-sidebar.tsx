"use client"

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@app/ui/components/sidebar"
import { HeaderLogo } from "@/components/ui/header"
import { DashboardNavSecondary } from "@/features/dashboard/components/sidebars/dashboard/dashboard-nav-secondary"
import { DashboardRoutesFilter } from "@/features/dashboard/components/sidebars/dashboard/dashboard-routes-filter"

type DashboardSidebarProps = {
  teamOnly: boolean
  workspaceId: string
}

export const DashboardSidebar = (props: DashboardSidebarProps) => {
  return (
    <Sidebar>
      <SidebarHeader className="items-center py-0.5">
        <HeaderLogo className="fill-primary" />
      </SidebarHeader>
      <SidebarContent>
        <DashboardRoutesFilter {...props} />
        <DashboardNavSecondary />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
