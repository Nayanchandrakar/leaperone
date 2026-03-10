import { useQuery } from "@tanstack/react-query"
import { fetchSession } from "@/lib/api"

export function useSession() {
  return useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await fetchSession()
      return data
    },
  })
}
