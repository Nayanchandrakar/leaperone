"use client"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@app/ui/components/alert-dialog"
import { Button } from "@app/ui/components/button"
import { Spinner } from "@app/ui/components/spinner"
import { useState } from "react"
import { toast } from "sonner"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"
import { useDeleteFiles } from "@/features/dashboard/hooks/asset-manager/use-delete-files"

export function AssetBulkDeleteDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate, isPending } = useDeleteFiles()

  const {
    actions: { dispatch },
    state: { assetIds, isFetching },
  } = useAssetComposer()

  const fileCount = assetIds?.length ?? 0

  function handleDelete() {
    if (assetIds?.length === 0) return

    mutate(assetIds, {
      onSuccess({ count }) {
        dispatch({ type: "clear-asset-ids" })
        setIsOpen(false)
        toast.success(`Successfully deleted ${count} file${count > 1 ? "s" : ""}`)
      },
    })
  }

  if (fileCount === 0) {
    return null
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="min-w-32" disabled={isFetching}>
          Delete Files
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete&nbsp;{fileCount}&nbsp;{fileCount > 1 ? "Files" : "File"}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your&nbsp;
            {fileCount > 1 ? "files" : "file"} from the asset manager.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} disabled={isPending || fileCount === 0}>
            {isPending && <Spinner />}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
