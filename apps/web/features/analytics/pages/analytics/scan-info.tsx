import { FormsSubmittedCard } from "@/features/analytics/cards/analytics/form-submissions-card"
import { TopLocationsCard } from "@/features/analytics/cards/analytics/top-locations"
import { TotalScansCard } from "@/features/analytics/cards/analytics/total-scans-card"

export const ScanInfo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <TotalScansCard />
      <TopLocationsCard />
      <FormsSubmittedCard />
    </div>
  )
}
