import { useQuery } from "@tanstack/react-query"
import { getInvitedMembers } from "@/lib/api"

export function useTeamMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const { data } = await getInvitedMembers()
      return data
    },
  })
}
