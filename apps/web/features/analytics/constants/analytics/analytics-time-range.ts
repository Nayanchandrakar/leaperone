import { CHART_TIME_RANGES } from "@app/core/constants"
import type { AnalyticsTimeRange } from "@/features/analytics/types"

export const ANALYTICS_TIME_RANGES: AnalyticsTimeRange[] = [
  { value: CHART_TIME_RANGES[0]!, title: "Today" },
  { value: CHART_TIME_RANGES[1]!, title: "Last 3 days" },
  { value: CHART_TIME_RANGES[2]!, title: "Last 7 days" },
  { value: CHART_TIME_RANGES[3]!, title: "Last 30 days" },
  { value: CHART_TIME_RANGES[4]!, title: "All Time" },
] as const
