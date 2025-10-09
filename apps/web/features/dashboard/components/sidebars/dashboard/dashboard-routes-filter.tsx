"use client"

import { useMemo } from "react"
import { DashboardNavGroup } from "@/features/dashboard/components/sidebars/dashboard/dashboard-nav-group"
import { DASHBOARD_NAV_MAIN } from "@/features/dashboard/constants/dashboard/dashboard-navigation"

type Props = {
  teamOnly: boolean
  workspaceId: string
}

export const DashboardRoutesFilter = ({ teamOnly, workspaceId }: Props) => {
  const ROUTES = useMemo(
    () => DASHBOARD_NAV_MAIN.filter((route) => !(route?.teamOnly && !teamOnly)),
    [teamOnly],
  )
  return <DashboardNavGroup data={ROUTES} workspaceId={workspaceId} />
}
