import type { Analytics } from "@app/database/types"
import { useMemo } from "react"
import { lightenColor } from "@/features/analytics/utils/analytics"

export type BrowserAnalysisResult = {
  browser: string
  clicks: number
  fill: string
}

const BASE_COLOR = "#0A9521"

export const useBrowserAnalysis = (records: Analytics[]): BrowserAnalysisResult[] => {
  return useMemo(() => {
    if (!records?.length) return []

    const browserCounts = new Map<string, number>()

    for (const { browser } of records) {
      const browserName = browser || "Unknown"
      browserCounts.set(browserName, (browserCounts.get(browserName) ?? 0) + 1)
    }

    const entries = Array.from(browserCounts.entries())

    // Sort by count so most used browser appears first
    entries.sort((a, b) => b[1] - a[1])

    const counts = entries.map(([, count]) => count)
    const minCount = Math.min(...counts)
    const maxCount = Math.max(...counts)
    const range = maxCount === minCount ? 1 : maxCount - minCount

    return entries.map(([browser, count]) => {
      const normalized = (count - minCount) / range // 0 (least) -> 1 (most)
      const fill = lightenColor(BASE_COLOR, normalized * 0.85)

      return { browser, clicks: count, fill }
    })
  }, [records])
}
