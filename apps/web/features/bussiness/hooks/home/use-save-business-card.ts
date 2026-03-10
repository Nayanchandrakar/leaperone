import type { SaveBusinessCardSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { saveBusinessCardMutation } from "@/lib/api"

export function useSaveBusinessCard() {
  const searchParams = useSearchParams()
  const isEdit = !!searchParams.get("edit")

  return useMutation({
    mutationFn: async (payload: Omit<SaveBusinessCardSchema, "isEdit">) => {
      const { data } = await saveBusinessCardMutation({ ...payload, isEdit })
      return data
    },
    onError: ({ message }) => toast.error(message),
  })
}
