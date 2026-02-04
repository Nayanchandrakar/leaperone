"use client"

import { QuickActionsCard } from "@/features/dashboard/components/cards/dashboard/quick-actions-card"
import { QuickActionCardSkeleton } from "@/features/dashboard/components/skeletons/dashboard"
import {
  DashboardStats,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"
import { QUICK_ACTIONS } from "@/features/dashboard/constants/dashboard/quick-actions"
import { usePermission } from "@/features/dashboard/hooks/dashboard/use-permission"

export const DashboardQuickActions = () => {
  const { isError, isPending, data } = usePermission("invite:members")

  return (
    <DashboardStats>
      <DashboardStatsTitle>Quick Actions</DashboardStatsTitle>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {isPending || isError ? (
          <QuickActionCardSkeleton />
        ) : (
          QUICK_ACTIONS.map(({ title, id, href, managerOnly, Icon }) => {
            if (managerOnly && !data?.hasPermission) return null
            return <QuickActionsCard key={id} href={href} label={title} Icon={Icon} />
          })
        )}
      </div>
    </DashboardStats>
  )
}
