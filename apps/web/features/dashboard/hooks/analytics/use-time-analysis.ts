import type { TimeAnalysisRow } from "@app/types"
import { useMemo } from "react"

export type GroupedResult = {
  time: string
  mobile: number
  desktop: number
}

const HOUR_BLOCK_LABELS = [
  "12AM-04AM",
  "04AM-08AM",
  "08AM-12PM",
  "12PM-04PM",
  "04PM-08PM",
  "08PM-12AM",
] as const

function formatHourBlock(block: number): string {
  const index = block / 4
  return HOUR_BLOCK_LABELS[index] ?? `${block}h`
}

/**
 * Transforms pre-aggregated time analysis rows from the server.
 * Receives ~12 rows max (6 blocks × 2 device types) instead of millions.
 */
export function useTimeAnalysis(rows: TimeAnalysisRow[] | undefined) {
  return useMemo(() => {
    if (!rows?.length) return []

    const grouped = new Map<string, [mobile: number, desktop: number]>()

    for (let i = 0, len = rows.length; i < len; ++i) {
      const r = rows[i]!
      const timeLabel = formatHourBlock(r.hour_block)

      let counts = grouped.get(timeLabel)
      if (counts === undefined) {
        counts = [0, 0]
        grouped.set(timeLabel, counts)
      }

      if (r.device === "Mobile") {
        counts[0] += r.count
      } else {
        counts[1] += r.count
      }
    }

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
  }, [rows])
}
