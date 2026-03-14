import { AssetComposer } from "@/features/dashboard/components/pages/asset-manager/asset-composer"
import { AssetComposerProvider } from "@/features/dashboard/components/pages/asset-manager/asset-compser-context"

export function FileComposer() {
  return (
    <AssetComposerProvider
      fileType="all"
      meta={{ inputPlaceholder: "Search images, PDFs or folders" }}
    >
      {/* Toolbar for the files */}
      <AssetComposer.Toolbar>
        <AssetComposer.SearchInput />
        <AssetComposer.UploadButton />
      </AssetComposer.Toolbar>

      {/* Filters for the files */}
      <AssetComposer.Filters>
        <AssetComposer.FileTypeSelector />
        <AssetComposer.SortSelector />
        <AssetComposer.MultiSelectToggle />
        <AssetComposer.SelectedCount />
        <AssetComposer.BulkDeleteDialog />
        <AssetComposer.BulkUnselectButton />
        <AssetComposer.BulkSelectButton />
      </AssetComposer.Filters>

      {/* Scrollable container for the files */}
      <AssetComposer.ScrollableContainer>
        <AssetComposer.FilesGrid>
          <AssetComposer.UploadProgressList />
          <AssetComposer.FilesList />
          <AssetComposer.FilesSkeleton />
        </AssetComposer.FilesGrid>
      </AssetComposer.ScrollableContainer>
    </AssetComposerProvider>
  )
}
