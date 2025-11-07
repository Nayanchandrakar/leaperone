import { CardTitle } from "@app/ui/components/card"
import { Progress } from "@app/ui/components/progress"
import type { GeoDataItem } from "@/features/analytics/types"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"

interface GeoChartCardProps {
  title: string
  data: GeoDataItem[]
}

export const GeoChartCard = ({ title, data }: GeoChartCardProps) => {
  return (
    <MetricCard>
      <CardTitle className="text-base text-muted-foreground">{title}</CardTitle>

      <div className="flex flex-col gap-4 ">
        {data.map((item) => (
          <GeoChartItem
            key={item.label}
            label={item.label}
            count={item.count}
            percentage={item.percentage}
          />
        ))}
      </div>
    </MetricCard>
  )
}

const GeoChartItem = ({ label, count, percentage }: GeoDataItem) => (
  <div className="space-y-1">
    <span className="flex justify-between text-xs font-normal text-muted-foreground">
      <p>{label}</p>
      <p>
        {count} ({percentage}%)
      </p>
    </span>
    <Progress value={percentage} />
  </div>
)
