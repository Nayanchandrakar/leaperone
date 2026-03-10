import type { ToogleCardStatusSchema } from "@app/zod/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { toogleCardStatusMutation } from "@/lib/api"

export function useToogleCardStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: ToogleCardStatusSchema) => {
      const { data } = await toogleCardStatusMutation(input)
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
