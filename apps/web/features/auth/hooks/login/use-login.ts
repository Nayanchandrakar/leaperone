import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { client } from "@/lib/hono/client"
import type { InferInput } from "@/types"

type Input = InferInput["auth"]["login"]

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: Input) => {
      const res = await client.auth.login.$post(data)
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
