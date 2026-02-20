import { getHours, startOfDay, subDays } from "date-fns"
import { MONTH_NAMES } from "@/features/analytics/constants/analytics/months"
import { TIME_RANGES } from "@/features/analytics/constants/analytics/time-ranges"
import type { TimeRangeValue } from "@/features/analytics/types"

// Date key extraction - hybrid approach
export function getDateKey(isoString: string) {
  return isoString.substring(0, 10)
}

export function getDateMonthKey(isoString: string) {
  // Direct string parsing of ISO format: "2024-03-15T..."
  // Month is at index 5-7, day is at index 8-10
  const monthIndex = Number.parseInt(isoString.substring(5, 7), 10) - 1
  const day = Number.parseInt(isoString.substring(8, 10), 10)
  const month = MONTH_NAMES[monthIndex]
  return `${day} ${month}`
}

export function format4HourBlock(isoString: string) {
  const hour = getHours(isoString)
  const block = hour & 0xfc

  const startHour12 = block === 0 ? 12 : block > 12 ? block - 12 : block
  const endBlock = block + 4
  const endHour12 = endBlock === 0 ? 12 : endBlock > 12 ? endBlock - 12 : endBlock

  const startPeriod = block < 12 ? "AM" : "PM"
  const endPeriod = endBlock < 12 || endBlock === 24 ? "AM" : "PM"

  const startTime = `${startHour12.toString().padStart(2, "0")}${startPeriod}`
  const endTime = endBlock === 24 ? "12AM" : `${endHour12.toString().padStart(2, "0")}${endPeriod}`

  return `${startTime}-${endTime}`
}

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
