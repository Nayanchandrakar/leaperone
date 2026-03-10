import type { GeoCountRow } from "@app/types"
import { Card, CardContent } from "@app/ui/components/card"
import { Skeleton } from "@app/ui/components/skeleton"
import { ComposableMap, Geographies } from "@vnedyalk0v/react19-simple-maps"
import {
  ChartDescription,
  ChartHeading,
  ChartTitle,
} from "@/features/dashboard/components/ui/chart-heading"
import { ISO_CODES } from "@/features/dashboard/constants/analytics/iso-codes"
import { useCountryMap } from "@/features/dashboard/hooks/analytics/use-country-map"
import { useMapTooltip } from "@/features/dashboard/hooks/analytics/use-map-tooltip"
import { CountryGeography, CountryGeographyTooltip } from "./country-geography"

// TopoJSON file for the world map
const GEO_URL = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json"

interface CountryMapProps {
  isPending: boolean
  topCountries: GeoCountRow[]
}

export function CountryMap({ topCountries, isPending }: CountryMapProps) {
  const { countryMap, maxCount } = useCountryMap(topCountries)
  const { content, tooltipRef, handleMouseEnter, handleMouseMove, handleMouseLeave } =
    useMapTooltip()

  return (
    <section className="flex flex-col gap-5 w-full xl:col-span-2">
      <ChartHeading>
        <ChartTitle>Location Analysis</ChartTitle>
        <ChartDescription>
          Know from where people are scanning the card. This may not be fully accurate.
        </ChartDescription>
      </ChartHeading>
      {isPending ? (
        <Skeleton className="rounded-xl min-h-149.5" />
      ) : (
        <Card className="bg-muted shadow-none border-zinc-300">
          <CardContent>
            <ComposableMap
              height={400}
              projection="geoEqualEarth"
              projectionConfig={{ scale: 150 }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <CountryGeography
                      geo={geo}
                      maxCount={maxCount}
                      key={geo.properties?.name}
                      handleMouseMove={handleMouseMove}
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      count={countryMap.get(ISO_CODES[geo.id]!)}
                    />
                  ))
                }
              </Geographies>
            </ComposableMap>
            {content && <CountryGeographyTooltip ref={tooltipRef} content={content} />}
          </CardContent>
        </Card>
      )}
    </section>
  )
}
