import type { AnalyticsResult } from "@app/types"
import { Skeleton } from "@app/ui/components/skeleton"
import { FormsSubmittedCard } from "@/features/analytics/cards/analytics/form-submissions-card"
import { TopLocationsCard } from "@/features/analytics/cards/analytics/top-locations"
import { TotalScansCard } from "@/features/analytics/cards/analytics/total-scans-card"

interface ScanInfoProps {
  isPending: boolean
  data: AnalyticsResult
}

export const ScanInfo = ({ data, isPending }: ScanInfoProps) => {
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
          <TotalScansCard totalScans={data.totalClicks} />
          <TopLocationsCard data={data} />
          <FormsSubmittedCard data={data} />
        </>
      )}
    </div>
  )
}
