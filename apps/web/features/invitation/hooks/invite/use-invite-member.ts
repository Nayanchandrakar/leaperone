import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { inviteMemberMutation } from "@/lib/api"

export const useInviteMember = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: inviteMemberMutation,
    onSuccess: () => {
      toast.success("Invitation sent successfully")
      queryClient.invalidateQueries({ queryKey: ["members"] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
