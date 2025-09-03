import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { client } from "@/lib/hono/client"
import type { RegistRequest } from "@/types"

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegistRequest) => {
      const res = await client.api.auth.register.$post(data)
      return await res.json()
    },
    onSuccess: ({ message }) => {
      toast.success(message)
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
