import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { client } from "@/lib/hono/client"
import type { ContactUsRequest } from "@/types"
import { ResponseHandler } from "@/utils/response-handler"

export const useContactUs = () => {
  return useMutation({
    mutationFn: async (json: ContactUsRequest) => {
      const res = await client.api.marketing["contact-us"].$post({ json })
      const data = await res.json()

      if (!res.ok) throw ResponseHandler.error(data)
      return data
    },

    onSuccess: ({ message }) => toast.success(message),
    onError: ({ message }) => toast.error(message),
  })
}
