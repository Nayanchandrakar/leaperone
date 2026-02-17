import {
  MetricCard,
  MetricCardLabel,
  MetricCardValue,
} from "@/features/dashboard/components/cards/dashboard/metric-card"
import type { GetAnalyticsRes } from "@/types/api-types"

interface FormsSubmittedCardProps {
  data: GetAnalyticsRes
}
export const FormsSubmittedCard = ({ data }: FormsSubmittedCardProps) => {
  return (
    <MetricCard>
      <MetricCardLabel>Number of forms submited</MetricCardLabel>
      <MetricCardValue>0</MetricCardValue>
    </MetricCard>
  )
}
