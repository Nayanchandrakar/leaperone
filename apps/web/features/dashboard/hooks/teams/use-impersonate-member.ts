import type { ImpersonateSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { impersonateMutation } from "@/lib/api"

export const useImpersonateMember = () => {
  return useMutation({
    mutationFn: async (input: ImpersonateSchema) => {
      const { data } = await impersonateMutation(input)
      return data
    },
    onSuccess: ({ message }) => {
      toast.success(message)
      window.location.href = "/dashboard"
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
