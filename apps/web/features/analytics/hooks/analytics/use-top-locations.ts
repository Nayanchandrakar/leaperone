import type { Analytics } from "@app/database/types"
import { useMemo } from "react"

export interface LocationData {
  count: number
  city: string
  country: string
}

export const useTopLocations = (records: Analytics[], limit = 5) => {
  return useMemo(() => {
    if (!records) return []

    type InterimLocationData = Omit<LocationData, "countryDisplayName">

    const locationCount = new Map<string, InterimLocationData>()

    let key: string
    let existing: InterimLocationData | undefined

    // Single-pass counting with optimized string operations
    for (const record of records) {
      key = [record.city, record.country].join("-")

      existing = locationCount.get(key)
      if (existing) {
        existing.count++
      } else {
        locationCount.set(key, {
          count: 1,
          city: record.city,
          country: record.country,
        })
      }
    }

    // Convert to array and use efficient sort + slice for top N
    // This is O(n log n) where n is number of unique locations (typically much smaller than total records)
    const locations = Array.from(locationCount.values())

    // Optimized sort for small arrays - insertion sort for top 5 would be even faster
    // but Array.sort is highly optimized in modern JS engines
    locations.sort((a, b) => b.count - a.count)

    return locations.slice(0, limit)
  }, [records, limit])
}
