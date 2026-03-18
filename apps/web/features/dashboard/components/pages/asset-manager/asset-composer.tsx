import { AssetBulkSelectButton } from "@/features/dashboard/components/buttons/asset-manager/bulk-select-button"
import { AssetBulkUnselectButton } from "@/features/dashboard/components/buttons/asset-manager/bulk-unselect-button"
import { BulkUploadButton } from "@/features/dashboard/components/buttons/asset-manager/bulk-upload-button"
import { AssetMultiSelectToggle } from "@/features/dashboard/components/buttons/asset-manager/multi-select-toggle"
import { NewFileUploadButton } from "@/features/dashboard/components/buttons/asset-manager/new-file-upload-button"
import { AssetSelectAllButton } from "@/features/dashboard/components/buttons/asset-manager/select-all-button"
import { AssetUnselectAllButton } from "@/features/dashboard/components/buttons/asset-manager/unselect-all-button"
import { AssetBulkDeleteDialog } from "@/features/dashboard/components/dialogs/asset-manager/asset-bulk-delete"
import {
  AssetFileTypeSelector,
  AssetFilters,
  AssetSelectedCount,
  AssetSortSelector,
} from "@/features/dashboard/components/filters/asset-manager"
import {
  AssetCheckboxFilesList,
  AssetDefaultFilesList,
  AssetFilesContainer,
  AssetFilesGrid,
  AssetFilesList,
  AssetFilesSkeleton,
  AssetPickerFilesList,
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
  DefaultFilesList: AssetDefaultFilesList,
  BulkUnselectButton: AssetBulkUnselectButton,
  UploadProgressList: AssetUploadProgressList,
  PickerFilesList: AssetPickerFilesList,
  CheckboxFilesList: AssetCheckboxFilesList,
  SelectAllButton: AssetSelectAllButton,
  UnselectAllButton: AssetUnselectAllButton,
  BulkUploadButton: BulkUploadButton,
}
