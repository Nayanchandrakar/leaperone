import { ListComponent } from "@/components/shared/list-component"
import {
  QuickActionCard,
  QuickActionCardLabel,
} from "@/features/dashboard/components/cards/dashboard/quick-actions-card"
import {
  DashboardStats,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"
import { QUICK_ACTIONS } from "@/features/dashboard/constants/dashboard/quick-actions"

export const DashboardQuickActions = () => {
  return (
    <DashboardStats>
      <DashboardStatsTitle>Quick Actions</DashboardStatsTitle>
      <ListComponent
        items={QUICK_ACTIONS}
        className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
        renderItem={({ id, title, href, Icon }) => (
          <QuickActionCard href={href} key={id}>
            <Icon className="size-6 text-primary" />
            <QuickActionCardLabel>{title}</QuickActionCardLabel>
          </QuickActionCard>
        )}
      />
    </DashboardStats>
  )
}
