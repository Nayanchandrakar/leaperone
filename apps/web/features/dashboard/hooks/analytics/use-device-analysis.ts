import type { DeviceAnalysisRow } from "@app/types"
import { useMemo } from "react"
import { lightenColor } from "@/features/dashboard/utils/analytics"

export type DeviceAnalysisResult = {
  os: string
  fill: string
  clicks: number
}

const BASE_COLOR = "#0A9521"

/**
 * Transforms pre-aggregated device/OS rows from the server.
 * Rows are already sorted by count desc — we just compute colors.
 */
export function useDeviceAnalysis(rows: DeviceAnalysisRow[] | undefined): DeviceAnalysisResult[] {
  return useMemo(() => {
    if (!rows?.length) return []

    const len = rows.length

    // Rows are pre-sorted desc by count from the server
    const maxCount = rows[0]!.count
    const minCount = rows[len - 1]!.count
    const range = maxCount === minCount ? 1 : maxCount - minCount

    const result = new Array<DeviceAnalysisResult>(len)

    for (let i = 0; i < len; ++i) {
      const r = rows[i]!
      const normalized = (r.count - minCount) / range
      const fill = lightenColor(BASE_COLOR, normalized * 0.85)

      result[i] = {
        clicks: r.count,
        os: r.os!,
        fill,
      }
    }

    return result
  }, [rows])
}
