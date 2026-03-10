import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteFilesMutation } from "@/lib/api"

interface UseFileDeleteProps {
  onSuccess: () => void
}

export function useFileDelete({ onSuccess }: UseFileDeleteProps) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (fileId: string) => await deleteFilesMutation([fileId]),
    onSuccess() {
      onSuccess()
      queryClient.invalidateQueries({ queryKey: ["files"] })
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })
}
