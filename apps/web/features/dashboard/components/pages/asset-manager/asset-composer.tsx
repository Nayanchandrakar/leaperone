import { AssetBulkSelectButton } from "@/features/dashboard/components/buttons/asset-manager/bulk-select-button"
import { AssetBulkUnselectButton } from "@/features/dashboard/components/buttons/asset-manager/bulk-unselect-button"
import { AssetMultiSelectToggle } from "@/features/dashboard/components/buttons/asset-manager/multi-select-toggle"
import { NewFileUploadButton } from "@/features/dashboard/components/buttons/asset-manager/new-file-upload-button"
import { AssetBulkDeleteDialog } from "@/features/dashboard/components/dialogs/asset-manager/asset-bulk-delete"
import {
  AssetFileTypeSelector,
  AssetFilters,
  AssetSelectedCount,
  AssetSortSelector,
} from "@/features/dashboard/components/filters/asset-manager"
import {
  AssetFilesContainer,
  AssetFilesGrid,
  AssetFilesList,
  AssetFilesSkeleton,
  AssetUploadProgressList,
} from "@/features/dashboard/components/pages/asset-manager/asset-files"
import {
  AssetSearchInput,
  AssetToolbar,
} from "@/features/dashboard/components/pages/asset-manager/asset-toolbar"

export const AssetComposer = {
  Toolbar: AssetToolbar,
  Filters: AssetFilters,
  FilesGrid: AssetFilesGrid,
  FilesList: AssetFilesList,
  SearchInput: AssetSearchInput,
  SortSelector: AssetSortSelector,
  UploadButton: NewFileUploadButton,
  SelectedCount: AssetSelectedCount,
  FilesSkeleton: AssetFilesSkeleton,
  FileTypeSelector: AssetFileTypeSelector,
  BulkDeleteDialog: AssetBulkDeleteDialog,
  BulkSelectButton: AssetBulkSelectButton,
  ScrollableContainer: AssetFilesContainer,
  MultiSelectToggle: AssetMultiSelectToggle,
  BulkUnselectButton: AssetBulkUnselectButton,
  UploadProgressList: AssetUploadProgressList,
}
