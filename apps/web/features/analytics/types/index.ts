import type { CHART_TIME_RANGES } from "@app/core/constants"

export type GeoDataItem = {
  label: string
  count: number
  percentage: number
}

export type ChartTimeRange = (typeof CHART_TIME_RANGES)[number]

export type AnalyticsTimeRange = {
  title: string
  value: ChartTimeRange
}
