import { startOfDay, subDays } from "date-fns"
import { TIME_RANGES } from "@/features/dashboard/constants/analytics/time-ranges"
import type { TimeRangeValue } from "@/features/dashboard/types"

export function getDateByTimeRange(timeRange: TimeRangeValue) {
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

export function getTimeRangeLabel(value: TimeRangeValue) {
  return TIME_RANGES.find((range) => range.value === value)?.label ?? ""
}

// Color utilities
export function lightenColor(hex: string, amount: number) {
  const clampedAmount = Math.max(0, Math.min(1, amount))
  const num = Number.parseInt(hex.slice(1), 16)

  const r = (num >> 16) & 0xff
  const g = (num >> 8) & 0xff
  const b = num & 0xff

  const newR = Math.round(r + (255 - r) * clampedAmount)
  const newG = Math.round(g + (255 - g) * clampedAmount)
  const newB = Math.round(b + (255 - b) * clampedAmount)

  return `#${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`
}
