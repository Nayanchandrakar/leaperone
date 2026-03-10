"use client"

import { QuickActionsList } from "@/features/dashboard/components/pages/dashboard/quick-actions-list"
import {
  DashboardStats,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"

export function QuickActions() {
  return (
    <DashboardStats>
      <DashboardStatsTitle>Quick Actions</DashboardStatsTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <QuickActionsList />
      </div>
    </DashboardStats>
  )
}
