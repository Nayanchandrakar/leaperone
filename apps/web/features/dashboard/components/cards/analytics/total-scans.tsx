import {
  MetricCard,
  MetricCardLabel,
  MetricCardValue,
} from "@/features/dashboard/components/cards/dashboard/metric-card"

interface TotalScansProps {
  totalClicks: number
}

export const TotalScans = ({ totalClicks = 0 }: TotalScansProps) => {
  return (
    <MetricCard>
      <MetricCardLabel>Total scans of your card</MetricCardLabel>
      <MetricCardValue>{totalClicks}</MetricCardValue>
    </MetricCard>
  )
}
