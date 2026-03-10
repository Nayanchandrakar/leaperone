import type { NameChangeFormSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { MESSAGES } from "@/constants/messages"

interface UseNameChangeProps {
  onSuccess?: () => void
}

export function useNameChange({ onSuccess }: UseNameChangeProps) {
  return useMutation({
    mutationFn: async (input: NameChangeFormSchema) => {
      //   const { data } = await nameChangeMutation(input)
      //   return data
      console.log(input)
      return await new Promise((resolve) => setTimeout(resolve, 3000))
    },
    onSuccess: () => {
      toast.success(MESSAGES.ACCOUNT.NAME_CHANGE_SUCCESS)
      onSuccess?.()
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
