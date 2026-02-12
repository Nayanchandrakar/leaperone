import { useQuery } from "@tanstack/react-query"
import { getWorkspaceSettings } from "@/lib/api"

export const useTeamSettings = () => {
  return useQuery({
    queryKey: ["team-settings"],
    queryFn: async () => {
      const { data } = await getWorkspaceSettings()
      return data
    },
  })
}
