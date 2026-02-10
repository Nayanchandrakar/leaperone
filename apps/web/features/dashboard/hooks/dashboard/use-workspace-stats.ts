import { useQuery } from "@tanstack/react-query"
import { getWorkspaceStats } from "@/lib/api"

export const useWorkspaceStats = () => {
  return useQuery({
    queryKey: ["workspace-stats"],
    queryFn: async () => {
      const { data } = await getWorkspaceStats()
      return data
    },
  })
}
