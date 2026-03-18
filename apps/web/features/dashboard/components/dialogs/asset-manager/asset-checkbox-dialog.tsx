import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@app/ui/components/dialog"
import { AssetComposer } from "@/features/dashboard/components/pages/asset-manager/asset-composer"
import { AssetComposerProvider } from "@/features/dashboard/components/pages/asset-manager/asset-composer-context"
import type { FileType } from "@/features/dashboard/types"

interface AssetCheckboxDialogProps {
  title: string
  isOpen: boolean
  fileType: FileType
  searchPlaceholder: string
  uploadActionLabel: string
  onUpload: (keys: string[]) => void
  onOpenChange: (isDialogOpen: boolean) => void
}

export function AssetCheckboxDialog({
  isOpen,
  title,
  fileType,
  onUpload,
  onOpenChange,
  searchPlaceholder,
  uploadActionLabel,
}: AssetCheckboxDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-270">
        <DialogHeader>
          <DialogTitle className="text-left">{title}</DialogTitle>
        </DialogHeader>

        <AssetComposerProvider
          fileType={fileType}
          onUpload={onUpload}
          meta={{ searchPlaceholder, uploadActionLabel }}
        >
          {/* Toolbar */}
          <AssetComposer.Toolbar className="mt-3">
            <AssetComposer.SearchInput />
            <AssetComposer.UploadButton />
          </AssetComposer.Toolbar>

          {/* Filters */}
          <AssetComposer.Filters className="mt-3">
            <AssetComposer.FileTypeSelector />
            <AssetComposer.SortSelector />
            <AssetComposer.SelectedCount />
            <AssetComposer.SelectAllButton />
            <AssetComposer.UnselectAllButton />
          </AssetComposer.Filters>

          {/* Scrollable Container */}
          <AssetComposer.ScrollableContainer className="mt-4 max-h-110">
            <AssetComposer.FilesGrid>
              <AssetComposer.UploadProgressList />
              <AssetComposer.CheckboxFilesList />
              <AssetComposer.FilesSkeleton />
            </AssetComposer.FilesGrid>
          </AssetComposer.ScrollableContainer>

          {/* Bulk Upload Button */}
          <DialogFooter className="sm:justify-center">
            <AssetComposer.BulkUploadButton />
          </DialogFooter>
        </AssetComposerProvider>
      </DialogContent>
    </Dialog>
  )
}
