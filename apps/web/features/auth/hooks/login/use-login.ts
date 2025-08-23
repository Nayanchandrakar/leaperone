import { useCallback } from "react"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"
import type { IUseSignUp } from "@/features/auth/types"
import { signIn } from "@/lib/auth"
import type { ILoginFormSchema } from "@/types/zod-types"

export const useLogin = ({ redirect }: IUseSignUp) => {
  const onSubmit = useCallback(
    async (data: ILoginFormSchema) => {
      const values = { ...data, ...(redirect && { callbackURL: redirect }) }

      await signIn.email(values, {
        onSuccess: ({ data }) => {
          toast.success(data.message ?? MESSAGES.AUTH.LOGIN_SUCCESS)
        },
      })
    },
    [redirect],
  )

  return { onSubmit }
}
