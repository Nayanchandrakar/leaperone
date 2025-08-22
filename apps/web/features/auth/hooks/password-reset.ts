import { useCallback } from "react"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"
import { authClient } from "@/lib/auth"
import type { IForgotPasswordFormSchema } from "@/types/zod-types"

export const usePasswordReset = () => {
  const onSubmit = useCallback(async (values: IForgotPasswordFormSchema) => {
    await authClient.requestPasswordReset(values, {
      onSuccess: ({ data }) => {
        toast.success(data.message ?? MESSAGES.PASSWORD.RESET_REQUEST_SUCCESS)
      },
    })
  }, [])

  return { onSubmit }
}
