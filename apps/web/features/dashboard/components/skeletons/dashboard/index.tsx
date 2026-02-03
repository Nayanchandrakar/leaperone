import { Skeleton } from "@app/ui/components/skeleton"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"

export const OverviewCardSkeleton = () => {
  return Array.from({ length: 4 }).map((_, index) => (
    <MetricCard key={index}>
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-8 max-w-20" />
    </MetricCard>
  ))
}
