import { useQuery } from "@tanstack/react-query"
import { useShallow } from "zustand/react/shallow"
import { useTimeRange } from "@/features/analytics/hooks/analytics/use-time-range"
import { getAnalytics } from "@/lib/api"

export const useAnalytics = () => {
  const { from, to } = useTimeRange(
    useShallow((state) => ({
      to: state.to,
      from: state.from,
    })),
  )
  return useQuery({
    queryKey: ["analytics", from, to],
    queryFn: async () => {
      const { data } = await getAnalytics({ to, from })
      return data
    },
  })
}
