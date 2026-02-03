import { useQuery } from "@tanstack/react-query"
import { getDashboardOverview } from "@/lib/api"

export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const { data } = await getDashboardOverview()
      return data
    },
  })
}
