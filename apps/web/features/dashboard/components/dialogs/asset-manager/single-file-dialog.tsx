import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@app/ui/components/dialog"
import type { Dispatch, SetStateAction } from "react"
import { AssetComposer } from "@/features/dashboard/components/pages/asset-manager/asset-composer"
import {
  type AssetComposerMeta,
  AssetComposerProvider,
} from "@/features/dashboard/components/pages/asset-manager/asset-compser-context"
import type { FileType } from "@/features/dashboard/types"

interface SingleFileDialogProps {
  title: string
  isOpen: boolean
  fileType: FileType
  meta: AssetComposerMeta
  uploadButtonLabel: string
  onBulkUpload: (assets: string[]) => void
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function SingleFileDialog({
  meta,
  fileType,
  title,
  isOpen,
  uploadButtonLabel,
  onBulkUpload,
  setIsOpen,
}: SingleFileDialogProps) {
  const handleBulkUpload = (assets: string[]) => {
    onBulkUpload(assets)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-270">
        <DialogHeader>
          <DialogTitle className="text-left">{title}</DialogTitle>
        </DialogHeader>
        <AssetComposerProvider fileType={fileType} meta={meta}>
          <AssetComposer.Toolbar className="mt-3">
            <AssetComposer.SearchInput />
            <AssetComposer.UploadButton />
          </AssetComposer.Toolbar>
          <AssetComposer.Filters className="mt-3">
            <AssetComposer.FileTypeSelector />
            <AssetComposer.SortSelector />
          </AssetComposer.Filters>
          <AssetComposer.ScrollableContainer className="mt-4 max-h-110">
            <AssetComposer.FilesGrid>
              <AssetComposer.UploadProgressList />
              <AssetComposer.PickerFilesList />
              <AssetComposer.FilesSkeleton />
            </AssetComposer.FilesGrid>
          </AssetComposer.ScrollableContainer>
          <DialogFooter className="sm:justify-center">
            <AssetComposer.BulkUploadButton label={uploadButtonLabel} onClick={handleBulkUpload} />
          </DialogFooter>
        </AssetComposerProvider>
      </DialogContent>
    </Dialog>
  )
}
