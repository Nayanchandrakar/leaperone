import type { RegisterFormSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { registerMutation } from "@/lib/api"

export function useRegister() {
  return useMutation({
    mutationFn: async (input: RegisterFormSchema) => {
      const { data } = await registerMutation(input)
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
