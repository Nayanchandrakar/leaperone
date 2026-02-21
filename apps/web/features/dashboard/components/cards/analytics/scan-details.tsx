import type { GeoCityRow } from "@app/types"
import { Skeleton } from "@app/ui/components/skeleton"
import { ScansInRange } from "@/features/dashboard/components/cards/analytics/scans-in-range"
import { TopLocations } from "@/features/dashboard/components/cards/analytics/top-locations"
import { TotalScans } from "@/features/dashboard/components/cards/analytics/total-scans"

interface ScanDetailProps {
  isPending: boolean
  totalClicks: number
  scansInRange: number
  topCities: GeoCityRow[]
}

export const ScanDetail = ({
  totalClicks,
  scansInRange,
  topCities,
  isPending,
}: ScanDetailProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {isPending ? (
        <>
          <Skeleton className="min-h-29" />
          <Skeleton className="sm:row-span-2 min-h-96.5" />
          <Skeleton className="min-h-29" />
        </>
      ) : (
        <>
          <TotalScans totalClicks={totalClicks} />
          <TopLocations topCities={topCities.slice(0, 5)} />
          <ScansInRange scansInRange={scansInRange} />
        </>
      )}
    </div>
  )
}
