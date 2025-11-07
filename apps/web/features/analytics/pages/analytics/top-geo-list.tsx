import { GeoChartCard } from "@/features/analytics/cards/analytics/geo-chart-card"
import type { GeoDataItem } from "@/features/analytics/types"

const mockCountriesData: GeoDataItem[] = [
  { label: "Canada", count: 197, percentage: 36 },
  { label: "Germany", count: 156, percentage: 28 },
  { label: "India", count: 72, percentage: 17 },
  { label: "Brazil", count: 65, percentage: 14 },
  { label: "Australia", count: 36, percentage: 5 },
]

const mockStatesData: GeoDataItem[] = [
  { label: "Ontario (CA)", count: 98, percentage: 23 },
  { label: "Bavaria (DE)", count: 72, percentage: 19 },
  { label: "British Columbia (CA)", count: 62, percentage: 14 },
  { label: "North Rhine-Westphalia (DE)", count: 43, percentage: 10 },
  { label: "Karnataka (IN)", count: 36, percentage: 5 },
]

const mockCitiesData: GeoDataItem[] = [
  { label: "Ontario (CA)", count: 98, percentage: 23 },
  { label: "Bavaria (DE)", count: 72, percentage: 19 },
  { label: "British Columbia (CA)", count: 62, percentage: 14 },
  { label: "North Rhine-Westphalia (DE)", count: 43, percentage: 10 },
  { label: "Karnataka (IN)", count: 36, percentage: 5 },
  { label: "Rio de Janeiro", count: 32, percentage: 4 },
]

export const TopGeoList = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
      <GeoChartCard title="Countries - Till Top 10" data={mockCountriesData} />
      <GeoChartCard title="States - Till Top 10" data={mockStatesData} />
      <GeoChartCard title="Cities - Till Top 10" data={mockCitiesData} />
    </section>
  )
}
