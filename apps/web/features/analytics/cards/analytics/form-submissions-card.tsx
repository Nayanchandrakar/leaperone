import type { AnalyticsResult } from "@app/types"
import {
  MetricCard,
  MetricCardLabel,
  MetricCardValue,
} from "@/features/dashboard/components/cards/dashboard/metric-card"

interface FormsSubmittedCardProps {
  data: AnalyticsResult
}

export const FormsSubmittedCard = ({ data }: FormsSubmittedCardProps) => {
  return (
    <MetricCard>
      <MetricCardLabel>Number of forms submited</MetricCardLabel>
      <MetricCardValue>0</MetricCardValue>
    </MetricCard>
  )
}
