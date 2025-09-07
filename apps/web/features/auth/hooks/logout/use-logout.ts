import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { client } from "@/lib/hono/client"
import { ResponseHandler } from "@/utils/response-handler"

export const useLogout = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      const res = await client.api.auth.logout.$post()
      const data = await res.json()

      if (!res.ok) throw ResponseHandler.error(data)
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
