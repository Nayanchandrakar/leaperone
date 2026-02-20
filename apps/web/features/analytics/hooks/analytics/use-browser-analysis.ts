import type { BrowserAnalysisRow } from "@app/types"
import { useMemo } from "react"
import { lightenColor } from "@/features/analytics/utils/analytics"

export type BrowserAnalysisResult = {
  browser: string
  clicks: number
  fill: string
}

const BASE_COLOR = "#0A9521"

/**
 * Transforms pre-aggregated browser rows from the server.
 * Rows are already sorted by count desc — we just compute colors.
 */
export const useBrowserAnalysis = (
  rows: BrowserAnalysisRow[] | undefined,
): BrowserAnalysisResult[] => {
  return useMemo(() => {
    if (!rows?.length) return []

    const len = rows.length

    // Rows are pre-sorted desc by count from the server
    const maxCount = rows[0]!.count
    const minCount = rows[len - 1]!.count
    const range = maxCount === minCount ? 1 : maxCount - minCount

    const result = new Array<BrowserAnalysisResult>(len)

    for (let i = 0; i < len; ++i) {
      const r = rows[i]!
      const normalized = (r.count - minCount) / range
      const fill = lightenColor(BASE_COLOR, normalized * 0.85)

      result[i] = {
        browser: r.browser!,
        clicks: r.count,
        fill,
      }
    }

    return result
  }, [rows])
}
