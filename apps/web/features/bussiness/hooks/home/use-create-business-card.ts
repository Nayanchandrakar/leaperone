import type { CreateBusinessCardSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useShareBusinessCard } from "@/features/dashboard/hooks/dashboard/use-share-business-card"
import { createBusinessCardMutation } from "@/lib/api"

export const useCreateBusinessCard = () => {
  const openDialog = useShareBusinessCard((state) => state.openDialog)

  return useMutation({
    mutationFn: async (json: CreateBusinessCardSchema) => {
      const { data } = await createBusinessCardMutation(json)
      return { res: data, qrCode: json.qrCode }
    },

    onSuccess: ({ res, qrCode }) => {
      toast.success(res.message)
      if (res.data?.identifier) {
        openDialog({
          identifier: res.data.identifier,
          qrCodeOptions: qrCode,
        })
      }
    },
    onError: (error: Error) => toast.error(error.message),
  })
}
