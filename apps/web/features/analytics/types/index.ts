export type GeoDataItem = {
  label: string
  count: number
  percentage: number
}

export type TimeRangeValue = "today" | "last-3-days" | "last-7-days" | "last-30-days" | "all-time"

export type TimeRangeData = {
  label: string
  value: TimeRangeValue
}[]
