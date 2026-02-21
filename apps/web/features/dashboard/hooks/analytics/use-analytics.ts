import { useQuery } from "@tanstack/react-query"
import { getAnalytics } from "@/lib/api"

type UseAnalyticsParams = {
  to: Date
  from: Date
  memberId: string | undefined
}

export const useAnalytics = ({ from, to, memberId }: UseAnalyticsParams) => {
  return useQuery({
    // Use ISO string for stable cache keys — Date objects create new references every render
    queryKey: ["analytics", from.toISOString(), to.toISOString(), memberId],
    queryFn: async () => {
      const { data } = await getAnalytics({ from, to, memberId })
      return data
    },
    // Keep previous data visible while refetching (avoids flash-of-skeleton)
    placeholderData: (previousData) => previousData,
    // Stale for 30s — analytics data doesn't change that frequently
    staleTime: 30_000,
  })
}
