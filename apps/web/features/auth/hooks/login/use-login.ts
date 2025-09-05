import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { client } from "@/lib/hono/client"
import type { LoginRequest } from "@/types"
import { ResponseHandler } from "@/utils/response-handler"

export const useLogin = () => {
  return useMutation({
    mutationFn: async (input: LoginRequest) => {
      const res = await client.api.auth.login.$post({ json: input })
      const data = await res.json()

      if (!res.ok) {
        throw ResponseHandler.error(data)
      }

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
