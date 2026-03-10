import type { SupportFormSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { askSupportMutation } from "@/lib/api"

export function useAskSupport() {
  return useMutation({
    mutationFn: async (json: SupportFormSchema) => {
      const { data } = await askSupportMutation(json)
      return data
    },

    onSuccess: ({ message }) => toast.success(message),
    onError: ({ message }) => toast.error(message),
  })
}
