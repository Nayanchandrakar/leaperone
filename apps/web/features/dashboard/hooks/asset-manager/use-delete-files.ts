import type { DeleteFilesSchema } from "@app/zod/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteFilesMutation } from "@/lib/api"

export function useDeleteFiles() {
  const queryClient = useQueryClient()

  return useMutation({
    async mutationFn(payload: DeleteFilesSchema) {
      const { data } = await deleteFilesMutation(payload)
      return data
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["files"] })
    },
    onError({ message }) {
      toast.error(message)
    },
  })
}
