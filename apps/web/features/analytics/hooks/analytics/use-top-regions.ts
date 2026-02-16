import type { Analytics } from "@app/database/types"
import { useMemo } from "react"

interface RegionData {
  count: number
  region: string
  country: string
}

export const useTopRegions = (records: Analytics[], limit = 10) => {
  return useMemo(() => {
    if (!records) return []

    const regionCount = new Map<string, RegionData>()

    let existing: RegionData | undefined

    for (const { region, country } of records) {
      existing = regionCount.get(region)

      if (existing) {
        existing.count++
      } else {
        regionCount.set(region, {
          region,
          country,
          count: 1,
        })
      }
    }

    const regions = Array.from(regionCount.values())
    regions.sort((a, b) => b.count - a.count)

    return regions.slice(0, limit)
  }, [records, limit])
}
