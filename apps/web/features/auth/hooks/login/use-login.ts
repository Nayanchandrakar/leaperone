import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { client } from "@/lib/hono/client"
import type { LoginRequest } from "@/types"
import { ResponseHandler } from "@/utils/response-handler"

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const req = await client.api.auth.login.$post({ json: data })
      const response = await req.json()

      if (!req.ok) {
        throw ResponseHandler.error(response)
      }

      return data
    },
    onSuccess: () => {
      toast.success("We have sent you an verification email")
    },

    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
