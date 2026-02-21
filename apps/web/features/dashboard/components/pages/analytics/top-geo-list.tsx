import type { GeoCityRow, GeoCountRow, GeoRegionRow } from "@app/types"
import { Skeleton } from "@app/ui/components/skeleton"
import { TopCities } from "@/features/dashboard/components/cards/analytics/top-cities"
import { TopCountries } from "@/features/dashboard/components/cards/analytics/top-countries"
import { TopRegions } from "@/features/dashboard/components/cards/analytics/top-regions"

interface TopGeoListProps {
  isPending: boolean
  scansInRange: number
  topCities: GeoCityRow[]
  topRegions: GeoRegionRow[]
  topCountries: GeoCountRow[]
}

export const TopGeoList = ({
  isPending,
  topCities,
  topRegions,
  topCountries,
  scansInRange,
}: TopGeoListProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      {isPending ? (
        Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="min-h-84" />)
      ) : (
        <>
          <TopCountries scansInRange={scansInRange} topCountries={topCountries} />
          <TopRegions scansInRange={scansInRange} topRegions={topRegions} />
          <TopCities scansInRange={scansInRange} topCities={topCities} />
        </>
      )}
    </section>
  )
}
