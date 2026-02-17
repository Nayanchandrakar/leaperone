import type { Analytics } from "@app/database/types"
import { useMemo } from "react"
import { format4HourBlock } from "@/features/analytics/utils/analytics"

export type GroupedResult = {
  time: string
  mobile: number
  desktop: number
}

export const useTimeAnalysis = (records: Analytics[]) => {
  return useMemo(() => {
    if (!records?.length) return []

    const grouped = new Map<string, [mobile: number, desktop: number]>()
    const len = records.length

    for (let i = 0; i < len; ++i) {
      const r = records[i]!
      const isoString = r.clickedAt as unknown as string

      const dateStr = format4HourBlock(isoString)

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

    for (const [time, counts] of grouped) {
      result[idx++] = {
        time,
        mobile: counts[0],
        desktop: counts[1],
      }
    }

    return result
  }, [records])
}
