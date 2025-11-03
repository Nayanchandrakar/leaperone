import { Button } from "@app/ui/components/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useShallow } from "zustand/react/shallow"
import { deleteFiles } from "@/features/dashboard/actions/delete-files"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

interface DeleteFilesButton {
  isActionDisabled: boolean
}

export const DeleteFilesButton = ({ isActionDisabled }: DeleteFilesButton) => {
  const queryClient = useQueryClient()

  const { clearSelectedAssetIds, selectedAssetIds } = useAssetStore(
    useShallow((state) => ({
      selectedAssetIds: state.selectedAssetIds,
      clearSelectedAssetIds: state.clearSelectedAssetIds,
    })),
  )

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (ids: string[]) => await deleteFiles(ids),
    onSuccess: ({ count }) => {
      queryClient.invalidateQueries({ queryKey: ["files"] })
      clearSelectedAssetIds()
      toast.success(`Succefully deleted ${count} files`)
    },
  })

  if (!selectedAssetIds?.length) return null

  return (
    <Button
      variant="destructive"
      className="min-w-32"
      onClick={() => mutateAsync(selectedAssetIds)}
      disabled={isPending || isActionDisabled}
    >
      Delete
    </Button>
  )
}
