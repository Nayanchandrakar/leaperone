import { useQuery } from "@tanstack/react-query"
import { getIsManager } from "@/lib/api"

export const useIsManager = () =>
  useQuery({
    queryKey: ["is-manager"],
    queryFn: async () => {
      const { data } = await getIsManager()
      return data
    },
  })
