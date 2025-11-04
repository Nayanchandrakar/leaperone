import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import { deleteFilesMutation } from "@/lib/api"

export const useDeleteFiles = () => {
  const queryClient = useQueryClient()

  const { clearSelectedAssetIds, selectedAssetIds } = useAssetStore(
    useShallow((state) => ({
      selectedAssetIds: state.selectedAssetIds,
      clearSelectedAssetIds: state.clearSelectedAssetIds,
    })),
  )

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => await deleteFilesMutation(selectedAssetIds),
    onSuccess: ({ data }) => {
      clearSelectedAssetIds()
      queryClient.invalidateQueries({ queryKey: ["files"] })
      toast.success(`Successfully deleted ${data.count} file`)
    },
    onError: ({ message }) => {
      toast.error(message)
    },
  })

  const fileCounts = selectedAssetIds?.length ?? 0

  return {
    isPending,
    fileCounts,
    mutateAsync,
  }
}
