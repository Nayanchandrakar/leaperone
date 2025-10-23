import type { EmailSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { requestPasswordResetMutation } from "@/lib/api"

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: async (input: EmailSchema) => {
      const { data } = await requestPasswordResetMutation(input)
      return data
    },

    onSuccess: ({ message }) => {
      toast.success(message)
    },

    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
