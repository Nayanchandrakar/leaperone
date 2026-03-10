import type { LoginFormSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { loginMutation } from "@/lib/api"

export function useLogin() {
  const router = useRouter()
  return useMutation({
    mutationFn: async (input: LoginFormSchema) => {
      const { data } = await loginMutation(input)
      return data
    },

    onSuccess: ({ success, message }) => {
      if (success) router.push("/")
      toast.success(message)
    },

    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
