import { useQuery } from "@tanstack/react-query"
import { getAnalyticsMembers } from "@/lib/api"

export const useAnalayticsMembers = () => {
  return useQuery({
    queryKey: ["analytics-members"],
    queryFn: async () => {
      const { data } = await getAnalyticsMembers()
      return data
    },
  })
}
