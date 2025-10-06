import { WifiPen } from "lucide-react"

import {
  DashboardStats,
  DashboardStatsGrid,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"

export const DashboardQuickActions = () => {
  return (
    <DashboardStats>
      <DashboardStatsTitle>Quick Actions</DashboardStatsTitle>

      <DashboardStatsGrid>
        {Array.from({ length: 4 }).map((key) => (
          <div
            key={`sdsdf3-${key}`}
            className="border border-zinc-400 rounded-xl p-7 flex flex-col gap-3 items-center"
          >
            <WifiPen className="size-6 text-primary" />
            <p className="text-muted-foreground font-normal text-sm">
              Buy NFC Items
            </p>
          </div>
        ))}
      </DashboardStatsGrid>
    </DashboardStats>
  )
}
