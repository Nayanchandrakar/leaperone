import { useCallback } from "react"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"
import { authClient } from "@/lib/auth"
import type { ILoginFormSchema } from "@/types/zod-types"

export const useLoginUser = () => {
  const onSubmit = useCallback(async (values: ILoginFormSchema) => {
    await authClient.signIn.email(values, {
      onSuccess: () => {
        toast.success(MESSAGES.AUTH.LOGIN_SUCCESS)
      },
      onError: ({ error }) => {
        toast.error(error.message)
      },
    })
  }, [])

  return { onSubmit }
}
