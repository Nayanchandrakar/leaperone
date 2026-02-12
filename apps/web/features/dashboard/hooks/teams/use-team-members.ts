import { useQuery } from "@tanstack/react-query"
import { getInvitedMembers } from "@/lib/api"

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await getInvitedMembers()
      return data
    },
  })
}
