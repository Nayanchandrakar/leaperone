"use client"

import { useMemo } from "react"
import { DashboardNavMain } from "@/features/dashboard/components/sidebars/dashboard/dashboard-nav-main"
import { DASHBOARD_NAV_MAIN } from "@/features/dashboard/constants/dashboard/dashboard-navigation"

interface DashboardRoutesFilterProps {
  teamOnly: boolean
  workspaceId: string
}

export const DashboardRoutesFilter = ({ teamOnly, workspaceId }: DashboardRoutesFilterProps) => {
  const ROUTES = useMemo(
    () => DASHBOARD_NAV_MAIN.filter((route) => !(route?.teamOnly && !teamOnly)),
    [teamOnly],
  )
  return <DashboardNavMain items={ROUTES} workspaceId={workspaceId} />
}
