import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { client } from "@/lib/hono/client"
import type { RegistRequest } from "@/types"
import { ResponseHandler } from "@/utils/response-handler"

export const useRegister = () => {
  return useMutation({
    mutationFn: async (input: RegistRequest) => {
      const res = await client.api.auth.register.$post({ json: input })
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
