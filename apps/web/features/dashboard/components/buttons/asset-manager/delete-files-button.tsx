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
import { useBulkDeleteFiles } from "@/features/dashboard/hooks/asset-manager/use-bulk-delete-files"

interface DeleteFilesButton {
  isActionDisabled: boolean
}

export const DeleteFilesButton = ({ isActionDisabled }: DeleteFilesButton) => {
  const { fileCounts, isPending, handleDelete, isOpen, setIsOpen } = useBulkDeleteFiles()

  if (fileCounts === 0) return null

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="min-w-32" disabled={isPending || isActionDisabled}>
          Delete files
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {fileCounts} Files?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your files from asset manager
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button onClick={handleDelete} disabled={isPending}>
            {isPending && <Spinner />}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
