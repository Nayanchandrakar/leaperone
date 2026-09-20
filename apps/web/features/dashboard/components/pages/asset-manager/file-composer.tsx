import { AssetComposer } from "@/features/dashboard/components/pages/asset-manager/asset-composer"
import { AssetComposerProvider } from "@/features/dashboard/components/pages/asset-manager/asset-composer-context"

export function FileComposerDefault() {
  return (
    <AssetComposerProvider
      fileType="all"
      meta={{ searchPlaceholder: "Search images, PDFs or folders" }}
    >
      <AssetComposer.Toolbar>
        <AssetComposer.SearchInput />
        <AssetComposer.UploadButton />
      </AssetComposer.Toolbar>
      <AssetComposer.Filters>
        <AssetComposer.FileTypeSelector />
        <AssetComposer.SortSelector />
        <AssetComposer.MultiSelectToggle />
        <AssetComposer.SelectedCount />
        <AssetComposer.BulkDeleteDialog />
        <AssetComposer.BulkUnselectButton />
        <AssetComposer.BulkSelectButton />
      </AssetComposer.Filters>
      <AssetComposer.ScrollableContainer>
        <AssetComposer.FilesGrid>
          <AssetComposer.UploadProgressList />
          <AssetComposer.DefaultFilesList />
          <AssetComposer.FilesSkeleton />
        </AssetComposer.FilesGrid>
      </AssetComposer.ScrollableContainer>
    </AssetComposerProvider>
  )
}
