import { format } from "date-fns"
import { useShallow } from "zustand/react/shallow"
import { useAnalyticsStore } from "@/features/dashboard/hooks/analytics/use-analytics-store"

export function SelectedTimeRange() {
  const { from, to } = useAnalyticsStore(
    useShallow((state) => ({
      to: state.to,
      from: state.from,
    })),
  )

  return (
    <p className="text-start text-muted-foreground text-sm">
      <span className="font-medium">Dates of chosen time range: </span>
      <span className="font-normal">
        {format(from, "dd MMM, yyyy")} - {format(to, "dd MMM, yyyy")}
      </span>
    </p>
  )
}
