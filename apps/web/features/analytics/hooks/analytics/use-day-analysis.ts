import type { Analytics } from "@app/database/types"
import { format, parseISO } from "date-fns"
import { useMemo } from "react"

export type GroupedResult = {
  day: string
  mobile: number
  desktop: number
}

export const useDayAnalysis = (records: Analytics[]) => {
  return useMemo(() => {
    if (!records?.length) return []

    const grouped = new Map<string, [mobile: number, desktop: number]>()
    const len = records.length

    for (let i = 0; i < len; ++i) {
      const r = records[i]!
      const isoString = r.clickedAt as unknown as string

      const dayKey = format(parseISO(isoString), "EEE")

      const counts = grouped.get(dayKey)
      if (counts === undefined) {
        grouped.set(dayKey, [0, 0])
      }

      // Direct array access for speed
      if (r.device === "Mobile") {
        grouped.get(dayKey)![0]++
      } else {
        grouped.get(dayKey)![1]++
      }
    }

    const dayOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const

    const result: GroupedResult[] = []

    for (const [day, counts] of grouped) {
      result.push({
        day,
        mobile: counts[0],
        desktop: counts[1],
      })
    }

    result.sort(
      (a, b) =>
        dayOrder.indexOf(a.day as (typeof dayOrder)[number]) -
        dayOrder.indexOf(b.day as (typeof dayOrder)[number]),
    )

    return result
  }, [records])
}
