"use client"

import {
  MetricCard,
  MetricCardLabel,
  MetricCardValue,
} from "@/features/dashboard/components/cards/dashboard/metric-card"
import { OverviewCardSkeleton } from "@/features/dashboard/components/skeletons/dashboard"
import {
  DashboardStats,
  DashboardStatsFooter,
  DashboardStatsGrid,
  DashboardStatsLink,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"
import { useWorkspaceStats } from "@/features/dashboard/hooks/dashboard/use-workspace-stats"

export const DashboardOverviewStats = () => {
  const { data, isPending, isError } = useWorkspaceStats()

  return (
    <DashboardStats>
      <DashboardStatsTitle>Overview</DashboardStatsTitle>
      <DashboardStatsGrid>
        {isPending || isError ? (
          <OverviewCardSkeleton />
        ) : (
          <>
            <MetricCard>
              <MetricCardLabel>Total scans of your card</MetricCardLabel>
              <MetricCardValue>{data?.totalClicks ?? 0}</MetricCardValue>
            </MetricCard>

            <MetricCard>
              <MetricCardLabel>Current Month Scans</MetricCardLabel>
              <MetricCardValue>{data?.currentMonthClicks ?? 0}</MetricCardValue>
            </MetricCard>

            <MetricCard>
              <MetricCardLabel>Number of forms submitted</MetricCardLabel>
              <MetricCardValue>{data?.formsSubmitted ?? 0}</MetricCardValue>
            </MetricCard>

            <MetricCard>
              <MetricCardLabel>Leaper One seats in use</MetricCardLabel>
              <MetricCardValue>
                {data?.seatsUsed ?? 0}/{data?.totalSeats ?? 0}
              </MetricCardValue>
            </MetricCard>
          </>
        )}
      </DashboardStatsGrid>
      <DashboardStatsFooter>
        <DashboardStatsLink href="/dashboard/analytics">View more analytics</DashboardStatsLink>
      </DashboardStatsFooter>
    </DashboardStats>
  )
}
