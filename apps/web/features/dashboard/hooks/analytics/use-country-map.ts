import type { GeoCountRow } from "@app/types"
import { useMemo } from "react"

export const useCountryMap = (countries: GeoCountRow[]) => {
  const { countryMap, maxCount } = useMemo(() => {
    let maxCount = 0
    const countryMap = new Map<string, number>()

    for (let i = 0; i < countries.length; i++) {
      const { country, count } = countries[i]!
      countryMap.set(country, count)
      if (count > maxCount) maxCount = count
    }

    return { countryMap, maxCount }
  }, [countries])

  return { countryMap, maxCount }
}
