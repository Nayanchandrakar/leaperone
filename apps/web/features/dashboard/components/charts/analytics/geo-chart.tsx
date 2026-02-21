import { Progress } from "@app/ui/components/progress"
import type { GeoDataItem } from "@/features/dashboard/types"

export const GeoChart = ({ label, count, percentage }: GeoDataItem) => (
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
