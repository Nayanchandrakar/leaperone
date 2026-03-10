import type { ResetPasswordSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { resetPasswordMutation } from "@/lib/api"

export function useResetPassword() {
  const router = useRouter()

  return useMutation({
    mutationFn: async (input: ResetPasswordSchema) => {
      const { data } = await resetPasswordMutation(input)
      return data
    },

    onSuccess: ({ message }) => {
      router.push("/login")
      toast.success(message)
    },

    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
