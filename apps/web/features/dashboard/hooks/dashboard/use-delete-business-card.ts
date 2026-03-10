import type { DeleteCardSchema } from "@app/zod/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteCardMutation } from "@/lib/api"

export function useDeleteCard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: DeleteCardSchema) => {
      const { data } = await deleteCardMutation(input)
      return data
    },
    onSuccess: ({ message }) => {
      toast.success(message)
      queryClient.invalidateQueries({ queryKey: ["business-card"] })
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
