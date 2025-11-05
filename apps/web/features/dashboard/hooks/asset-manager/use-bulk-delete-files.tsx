import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useState } from "react"
import { toast } from "sonner"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import { deleteFilesMutation } from "@/lib/api"

export const useBulkDeleteFiles = () => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

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

  const handleDelete = useCallback(async () => {
    if (fileCounts > 0) {
      await mutateAsync()
      setIsOpen(false)
    }
  }, [fileCounts, mutateAsync])

  return {
    isOpen,
    setIsOpen,
    isPending,
    fileCounts,
    handleDelete,
  }
}
