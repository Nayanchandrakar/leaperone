import type { Analytics } from "@app/database/types"
import { useMemo } from "react"

interface CityData {
  city: string
  count: number
  country: string
}

export const useTopCities = (records: Analytics[], limit = 10) => {
  return useMemo(() => {
    if (!records) return []

    const cityCount = new Map<string, CityData>()

    let existing: CityData | undefined

    for (const { city, country } of records) {
      existing = cityCount.get(city)

      if (existing) {
        existing.count++
      } else {
        cityCount.set(city, {
          city,
          country,
          count: 1,
        })
      }
    }

    const cities = Array.from(cityCount.values())
    cities.sort((a, b) => b.count - a.count)

    return cities.slice(0, limit)
  }, [records, limit])
}
