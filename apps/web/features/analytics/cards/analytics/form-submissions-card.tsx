import {
  MetricCard,
  MetricCardLabel,
  MetricCardValue,
} from "@/features/dashboard/components/cards/dashboard/metric-card"

export const FormsSubmittedCard = () => {
  return (
    <MetricCard>
      <MetricCardLabel>Number of forms submited</MetricCardLabel>
      <MetricCardValue>73</MetricCardValue>
    </MetricCard>
  )
}
