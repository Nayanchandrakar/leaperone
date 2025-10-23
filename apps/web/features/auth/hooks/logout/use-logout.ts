import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { logoutMutation } from "@/lib/api"

export const useLogout = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      const { data } = await logoutMutation()
      return data
    },
    onSuccess: ({ message }) => {
      router.refresh()
      toast.success(message)
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
