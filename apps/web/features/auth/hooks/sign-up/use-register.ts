import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { client } from "@/lib/hono/client"
import type { InferInput } from "@/types"

type Input = InferInput["auth"]["register"]

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: Input) => {
      const res = await client.auth.register.$post(data)
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
