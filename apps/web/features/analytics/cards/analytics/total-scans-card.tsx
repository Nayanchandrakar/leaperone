import {
  MetricCard,
  MetricCardLabel,
  MetricCardValue,
} from "@/features/dashboard/components/cards/dashboard/metric-card"

interface TotalScansCardProps {
  totalScans: number
}

export const TotalScansCard = ({ totalScans = 0 }: TotalScansCardProps) => {
  return (
    <MetricCard>
      <MetricCardLabel>Total scans of your card</MetricCardLabel>
      <MetricCardValue>{totalScans}</MetricCardValue>
    </MetricCard>
  )
}
