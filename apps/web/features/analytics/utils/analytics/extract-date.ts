import { ALL_TIME, LAST_MONTH, LAST_WEEK, LAST_YEAR } from "@app/core/constants"
import type { ChartTimeRange } from "@/features/analytics/types"

export function extractDate(timeRange: ChartTimeRange) {
  let startDate: Date
  let endDate: Date

  switch (timeRange) {
    case "today":
      startDate = new Date()
      endDate = new Date()
      break
    case "last-week":
      startDate = new Date(Date.now() - LAST_WEEK)
      endDate = new Date()
      break
    case "last-month":
      startDate = new Date(Date.now() - LAST_MONTH)
      endDate = new Date()
      break
    case "last-year":
      startDate = new Date(Date.now() - LAST_YEAR)
      endDate = new Date()
      break
    case "all-time":
      startDate = new Date(ALL_TIME)
      endDate = new Date()
      break
    default:
      startDate = new Date()
      endDate = new Date()
      break
  }

  return { startDate, endDate }
}
