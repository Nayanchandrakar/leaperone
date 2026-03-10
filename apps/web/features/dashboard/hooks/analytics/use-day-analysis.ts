import type { DayAnalysisRow } from "@app/types"
import { useMemo } from "react"
import { DAYS } from "@/features/dashboard/constants/analytics/days"

export type GroupedResult = {
  day: string
  mobile: number
  desktop: number
}

/**
 * Transforms pre-aggregated day analysis rows from the server.
 * Receives ~14 rows max (7 days × 2 device types) instead of millions.
 */
export function useDayAnalysis(rows: DayAnalysisRow[] | undefined) {
  return useMemo(() => {
    if (!rows?.length) return []

    // Use a fixed-size array for O(1) access by day index
    const days: [mobile: number, desktop: number][] = Array.from({ length: 7 }, () => [0, 0])

    for (let i = 0, len = rows.length; i < len; ++i) {
      const r = rows[i]!
      const dayIdx = r.day_of_week // 0=Sun .. 6=Sat from postgres dow

      if (r.device === "Mobile") {
        days[dayIdx]![0] += r.count
      } else {
        days[dayIdx]![1] += r.count
      }
    }

    // Only include days that have data, already in correct order
    const result: GroupedResult[] = []

    for (let d = 0; d < 7; ++d) {
      const counts = days[d]!
      if (counts[0] > 0 || counts[1] > 0) {
        result.push({
          mobile: counts[0],
          desktop: counts[1],
          day: DAYS[d] as string,
        })
      }
    }

    return result
  }, [rows])
}
