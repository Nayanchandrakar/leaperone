"use client"

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@app/ui/components/sidebar"
import { HeaderLogo } from "@/components/ui/header"
import { DashboardNavSecondary } from "@/features/dashboard/components/sidebars/dashboard/dashboard-nav-secondary"
import { DashboardNavSettings } from "@/features/dashboard/components/sidebars/dashboard/dashboard-nav-settings"
import { DashboardRoutesFilter } from "@/features/dashboard/components/sidebars/dashboard/dashboard-routes-filter"
import { DASHBOARD_NAV_SETTINGS } from "@/features/dashboard/constants/dashboard/dashboard-navigation"

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
        <DashboardNavSettings items={DASHBOARD_NAV_SETTINGS} />
        <DashboardNavSecondary />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
