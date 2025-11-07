import {
  MetricCard,
  MetricCardLabel,
  MetricCardValue,
} from "@/features/dashboard/components/cards/dashboard/metric-card"

export const TotalScansCard = () => {
  return (
    <MetricCard>
      <MetricCardLabel>Total scans of your card</MetricCardLabel>
      <MetricCardValue>5689</MetricCardValue>
    </MetricCard>
  )
}
