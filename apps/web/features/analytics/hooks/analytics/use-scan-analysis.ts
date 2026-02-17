import type { Analytics } from "@app/database/types"
import { getHours } from "date-fns"
import { useMemo } from "react"
import type { TimeRangeValue } from "@/features/analytics/types"
import { format4HourBlock, getDateKey, getDateMonthKey } from "@/features/analytics/utils/analytics"

export type GroupedResult = {
  date: string
  mobile: number
  desktop: number
}

export const useScanAnalysis = (records: Analytics[], timeRange: TimeRangeValue) => {
  return useMemo(() => {
    if (!records?.length) return []

    const grouped = new Map<string, [mobile: number, desktop: number]>()
    const len = records.length

    for (let i = 0; i < len; ++i) {
      const r = records[i]!
      const isoString = r.clickedAt as unknown as string

      let dateStr: string

      switch (timeRange) {
        case "today":
          dateStr = format4HourBlock(isoString)
          break
        case "last-3-days": {
          const hour = getHours(isoString)
          const period = hour < 12 ? "AM" : "PM"
          dateStr = `${getDateMonthKey(isoString)} ${period}`
          break
        }
        case "all-time":
          dateStr = isoString.substring(0, 4)
          break
        case "last-7-days":
        case "last-30-days":
          dateStr = getDateMonthKey(isoString)
          break
        default:
          dateStr = getDateKey(isoString)
          break
      }

      const counts = grouped.get(dateStr)
      if (counts === undefined) {
        grouped.set(dateStr, [0, 0])
      }

      // Direct array access for speed
      if (r.device === "Mobile") {
        grouped.get(dateStr)![0]++
      } else {
        grouped.get(dateStr)![1]++
      }
    }

    // Pre-allocate exact size array
    const result = new Array<GroupedResult>(grouped.size)
    let idx = 0

    for (const [date, counts] of grouped) {
      result[idx++] = {
        date,
        mobile: counts[0],
        desktop: counts[1],
      }
    }

    return result
  }, [records, timeRange])
}
