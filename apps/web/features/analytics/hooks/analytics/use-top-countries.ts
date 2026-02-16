import type { Analytics } from "@app/database/types"
import { useMemo } from "react"

export const useTopCountries = (records: Analytics[], limit = 10) => {
  return useMemo(() => {
    if (!records) return []

    const countryCount = new Map<string, number>()

    // Count occurrences per country
    for (const { country } of records) {
      countryCount.set(country, (countryCount.get(country) ?? 0) + 1)
    }

    const countries = Array.from(countryCount.entries())
    countries.sort((a, b) => b[1] - a[1])

    return countries.slice(0, limit)
  }, [records, limit])
}
