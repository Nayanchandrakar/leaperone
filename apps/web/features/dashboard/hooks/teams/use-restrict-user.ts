import type { RestrictUserSchema } from "@app/zod/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { restrictUserMutation } from "@/lib/api"

export const useRestrictUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: RestrictUserSchema) => {
      const { data } = await restrictUserMutation(input)
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
