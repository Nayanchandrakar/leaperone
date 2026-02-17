import type { PasswordSetupSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { passwordSetupMutation } from "@/lib/api"

export const usePasswordSetup = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: async (input: PasswordSetupSchema) => {
      const { data } = await passwordSetupMutation(input)
      return data
    },
    onSuccess: ({ success, message }) => {
      if (success) router.push("/login")
      toast.success(message)
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
