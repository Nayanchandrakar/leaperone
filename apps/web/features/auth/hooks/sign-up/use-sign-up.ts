import { useCallback } from "react"
import { toast } from "sonner"
import type { IUseSignUp } from "@/features/auth/types"
import { signUp } from "@/lib/auth"
import type { ISignupFormSchema } from "@/types/zod-types"
import { URLS } from "@/utils/urls"

export const useSignup = ({ redirect }: IUseSignUp) => {
  const onSubmit = useCallback(
    async (data: ISignupFormSchema) => {
      const values = { ...data, callbackURL: redirect ?? URLS.PRICING_PAGE }

      await signUp.email(values, {
        onSuccess: () => {
          toast.success(`We’ve sent a verification link to ${values.email}`, {
            icon: "✉️",
            action: {
              label: "Open Gmail",
              onClick: () => {
                window.open("https://mail.google.com/mail/#inbox", "_blank")
              },
            },
          })
        },
      })
    },
    [redirect],
  )

  return {
    onSubmit,
  }
}
