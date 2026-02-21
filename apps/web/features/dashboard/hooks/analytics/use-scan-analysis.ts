import type { ScanAnalysisRow } from "@app/types"
import { format } from "date-fns"
import { useMemo } from "react"
import type { TimeRangeValue } from "@/features/dashboard/types"

export type GroupedResult = {
  date: string
  mobile: number
  desktop: number
}

/**
 * Transforms pre-aggregated scan analysis rows (already grouped by day on the server)
 * into chart-ready data. Applies a display label per timeRange — no raw record iteration.
 */
export const useScanAnalysis = (rows: ScanAnalysisRow[] | undefined, timeRange: TimeRangeValue) => {
  return useMemo(() => {
    if (!rows?.length) return []

    const grouped = new Map<string, [mobile: number, desktop: number]>()

    for (let i = 0, len = rows.length; i < len; ++i) {
      const r = rows[i]!
      // r.day is already a date-truncated string like "2024-03-15T00:00:00.000Z"
      const dayStr = r.day as string

      // Select display label based on timeRange granularity using date-fns
      let dateStr: string

      if (timeRange === "all-time") {
        dateStr = dayStr.substring(0, 4)
      } else {
        dateStr = format(dayStr, "d MMM")
      }

      let counts = grouped.get(dateStr)
      if (counts === undefined) {
        counts = [0, 0]
        grouped.set(dateStr, counts)
      }

      if (r.device === "Mobile") {
        counts[0] += r.count
      } else {
        counts[1] += r.count
      }
    }

    const result = new Array<GroupedResult>(grouped.size)
    let idx = 0

    for (const [date, counts] of grouped) {
      result[idx++] = { date, mobile: counts[0], desktop: counts[1] }
    }

    return result
  }, [rows, timeRange])
}
