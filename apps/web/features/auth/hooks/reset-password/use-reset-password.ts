import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { client } from "@/lib/hono/client"
import type { ResetPasswordRequest } from "@/types"
import { ResponseHandler } from "@/utils/response-handler"

export const useResetPassword = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (input: ResetPasswordRequest) => {
      const res = await client.api.auth["reset-password"].$post({
        json: input,
      })
      const data = await res.json()

      if (!res.ok) throw ResponseHandler.error(data)
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
