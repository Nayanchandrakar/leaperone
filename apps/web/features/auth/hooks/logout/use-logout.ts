import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { logoutMutation } from "@/lib/api"

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await logoutMutation()
      return data
    },
    onSuccess: ({ message }) => {
      window.location.href = "/"
      toast.success(message)
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
