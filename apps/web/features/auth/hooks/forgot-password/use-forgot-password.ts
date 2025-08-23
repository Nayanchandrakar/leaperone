import { useCallback } from "react"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"
import { requestPasswordReset } from "@/lib/auth"
import type { IForgotPasswordFormSchema } from "@/types/zod-types"

export const useForgotPassword = () => {
  const onSubmit = useCallback(async (values: IForgotPasswordFormSchema) => {
    await requestPasswordReset(values, {
      onSuccess: ({ data }) => {
        toast.success(data.message ?? MESSAGES.PASSWORD.RESET_REQUEST_SUCCESS)
      },
    })
  }, [])

  return { onSubmit }
}
