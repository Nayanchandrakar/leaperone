import { useCallback } from "react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth"
import type { IForgotPasswordFormSchema } from "@/types/zod-types"

export const usePasswordReset = () => {
  const onSubmit = useCallback(async (values: IForgotPasswordFormSchema) => {
    await authClient.requestPasswordReset(values, {
      onSuccess: ({ data }) => {
        toast.success(data.message)
      },
      onError: ({ error }) => {
        toast.error(error.message)
      },
    })
  }, [])

  return { onSubmit }
}
