import type { Analytics } from "@app/database/types"
import { useMemo } from "react"
import { lightenColor } from "@/features/analytics/utils/analytics"

export type DeviceAnalysisResult = {
  os: string
  clicks: number
  fill: string
}

const BASE_COLOR = "#0A9521"

export const useDeviceAnalysis = (records: Analytics[]): DeviceAnalysisResult[] => {
  return useMemo(() => {
    if (!records?.length) return []

    const osCounts = new Map<string, number>()

    for (const { os } of records) {
      const osName = os || "Unknown"
      osCounts.set(osName, (osCounts.get(osName) ?? 0) + 1)
    }

    const entries = Array.from(osCounts.entries())

    // Sort by count so most used OS appears first
    entries.sort((a, b) => b[1] - a[1])

    const counts = entries.map(([, count]) => count)
    const minCount = Math.min(...counts)
    const maxCount = Math.max(...counts)
    const range = maxCount === minCount ? 1 : maxCount - minCount

    return entries.map(([os, count]) => {
      const normalized = (count - minCount) / range // 0 (least) -> 1 (most)
      // Least clicked OS -> darkest BASE_COLOR
      // Most clicked OS -> lightest variant of BASE_COLOR
      const fill = lightenColor(BASE_COLOR, normalized * 0.85)

      return { os, clicks: count, fill }
    })
  }, [records])
}
