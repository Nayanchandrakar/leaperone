import {
  MetricCard,
  MetricCardLabel,
  MetricCardValue,
} from "@/features/dashboard/components/cards/dashboard/metric-card"
import { useAnalyticsStore } from "@/features/dashboard/hooks/analytics/use-analytics-store"

interface ScansInRangeProps {
  scansInRange: number
}

export function ScansInRange({ scansInRange = 0 }: ScansInRangeProps) {
  const timeRangeLabel = useAnalyticsStore((state) => state.timeRangeLabel)
  return (
    <MetricCard>
      <MetricCardLabel>Scans for {timeRangeLabel}</MetricCardLabel>
      <MetricCardValue>{scansInRange}</MetricCardValue>
    </MetricCard>
  )
}
