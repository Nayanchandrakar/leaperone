import type { ContactUsFormSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { contactUsMutation } from "@/lib/api"

export function useContactUs() {
  return useMutation({
    mutationFn: async (json: ContactUsFormSchema) => {
      const { data } = await contactUsMutation(json)
      return data
    },

    onSuccess: ({ message }) => toast.success(message),
    onError: ({ message }) => toast.error(message),
  })
}
