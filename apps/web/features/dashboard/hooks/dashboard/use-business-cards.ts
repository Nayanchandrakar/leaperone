import { useQuery } from "@tanstack/react-query"
import { getBusinessCards } from "@/lib/api"

export const useBusinessCards = () => {
  return useQuery({
    queryKey: ["business-card"],
    queryFn: async () => {
      const { data } = await getBusinessCards()
      return data
    },
  })
}
