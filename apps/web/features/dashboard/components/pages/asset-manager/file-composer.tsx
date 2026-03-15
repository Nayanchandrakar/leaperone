import { AssetComposer } from "@/features/dashboard/components/pages/asset-manager/asset-composer"
import { AssetComposerProvider } from "@/features/dashboard/components/pages/asset-manager/asset-compser-context"

const meta = { inputPlaceholder: "Search images, PDFs or folders" }

function FileComposerNone() {
  return (
    <AssetComposerProvider fileType="all" meta={meta}>
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

export function FileComposerPicker() {
  return (
    <AssetComposerProvider fileType="all" meta={meta}>
      <AssetComposer.Toolbar>
        <AssetComposer.SearchInput />
        <AssetComposer.UploadButton />
      </AssetComposer.Toolbar>
      <AssetComposer.Filters>
        <AssetComposer.FileTypeSelector />
        <AssetComposer.SortSelector />
      </AssetComposer.Filters>
      <AssetComposer.ScrollableContainer>
        <AssetComposer.FilesGrid>
          <AssetComposer.UploadProgressList />
          <AssetComposer.PickerFilesList />
          <AssetComposer.FilesSkeleton />
        </AssetComposer.FilesGrid>
      </AssetComposer.ScrollableContainer>
    </AssetComposerProvider>
  )
}

export function FileComposerCheckbox() {
  return (
    <AssetComposerProvider fileType="all" meta={meta}>
      <AssetComposer.Toolbar>
        <AssetComposer.SearchInput />
        <AssetComposer.UploadButton />
      </AssetComposer.Toolbar>
      <AssetComposer.Filters>
        <AssetComposer.FileTypeSelector />
        <AssetComposer.SortSelector />
        <AssetComposer.SelectedCount />
        <AssetComposer.SelectAllButton />
        <AssetComposer.UnselectAllButton />
      </AssetComposer.Filters>
      <AssetComposer.ScrollableContainer>
        <AssetComposer.FilesGrid>
          <AssetComposer.UploadProgressList />
          <AssetComposer.CheckboxFilesList />
          <AssetComposer.FilesSkeleton />
        </AssetComposer.FilesGrid>
      </AssetComposer.ScrollableContainer>
    </AssetComposerProvider>
  )
}

export function FileComposer() {
  return (
    <>
      <FileComposerNone />
      {/* <FileComposerPicker /> */}
      {/* <FileComposerCheckbox /> */}
    </>
  )
}
