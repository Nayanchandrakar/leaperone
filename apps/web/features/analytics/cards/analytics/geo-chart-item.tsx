import { Progress } from "@app/ui/components/progress"
import type { GeoDataItem } from "@/features/analytics/types"

export const GeoChartItem = ({ label, count, percentage }: GeoDataItem) => (
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
