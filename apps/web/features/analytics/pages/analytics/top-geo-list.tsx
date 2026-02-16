import { Skeleton } from "@app/ui/components/skeleton"
import { TopCities } from "@/features/analytics/cards/analytics/top-cities"
import { TopCountries } from "@/features/analytics/cards/analytics/top-countries"
import { TopRegions } from "@/features/analytics/cards/analytics/top-regions"
import type { GetAnalyticsRes } from "@/types/api-types"

interface TopGeoListProps {
  isPending: boolean
  data: GetAnalyticsRes
}

export const TopGeoList = ({ isPending, data }: TopGeoListProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      {isPending ? (
        Array.from({ length: 3 }).map((_, index) => <Skeleton key={index} className="min-h-84" />)
      ) : (
        <>
          <TopCountries data={data} />
          <TopRegions data={data} />
          <TopCities data={data} />
        </>
      )}
    </section>
  )
}
