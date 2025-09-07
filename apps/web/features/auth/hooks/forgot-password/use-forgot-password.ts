import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { client } from "@/lib/hono/client"
import type { RequestPasswordResetRequest } from "@/types"
import { ResponseHandler } from "@/utils/response-handler"

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: async (input: RequestPasswordResetRequest) => {
      const res = await client.api.auth["request-password-reset"].$post({
        json: input,
      })
      const data = await res.json()

      if (!res.ok) throw ResponseHandler.error(data)
      return data
    },
    onSuccess: ({ message }) => {
      toast.success(message)
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
