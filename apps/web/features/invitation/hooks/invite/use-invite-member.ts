import type { InviteMemberSchema } from "@app/zod/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { inviteMemberMutation } from "@/lib/api"

export function useInviteMember() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: InviteMemberSchema) => {
      const { data } = await inviteMemberMutation(input)
      return data
    },
    onSuccess: ({ message }) => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ["members"] })
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
