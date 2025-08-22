import { useCallback } from "react"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"
import { authClient } from "@/lib/auth"
import type { ILoginFormSchema } from "@/types/zod-types"

export const useLoginUser = (callbackURL: string | undefined) => {
  const onSubmit = useCallback(
    async (values: ILoginFormSchema) => {
      const formData = { ...values, ...(callbackURL && { callbackURL }) }

      await authClient.signIn.email(formData, {
        onSuccess: ({ data }) => {
          toast.success(data.message ?? MESSAGES.AUTH.LOGIN_SUCCESS)
        },
        onError: ({ error }) => {
          toast.error(error.message)
        },
      })
    },
    [callbackURL],
  )

  return { onSubmit }
}
