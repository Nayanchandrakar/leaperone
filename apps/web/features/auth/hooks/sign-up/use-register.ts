import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useTRPC } from "@/lib/trpc/client"

export const useRegister = () => {
  const trpc = useTRPC()
  return useMutation(
    trpc.auth.register.mutationOptions({
      onSuccess: ({ message }) => {
        toast.success(message)
      },
      onError: ({ message }) => {
        toast.error(message)
      },
    }),
  )
}
