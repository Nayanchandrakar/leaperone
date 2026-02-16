import { startOfDay, subDays } from "date-fns"
import type { TimeRangeValue } from "@/features/analytics/types"

export function getStartDateByTimeRange(timeRange: TimeRangeValue) {
  const now = new Date()

  switch (timeRange) {
    case "today":
      return startOfDay(now)
    case "last-3-days":
      return startOfDay(subDays(now, 3))
    case "last-7-days":
      return startOfDay(subDays(now, 7))
    case "last-30-days":
      return startOfDay(subDays(now, 30))
    case "all-time":
      return startOfDay(new Date(0))
    default:
      return startOfDay(now)
  }
}
