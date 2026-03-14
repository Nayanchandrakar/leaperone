import type { FileStatus, FileType, SortBy, UploadProgress } from "@/features/dashboard/types"

export type AssetComposerAction =
  | { type: "clear-asset-ids" }
  | { type: "set-sort-by"; payload: SortBy }
  | { type: "add-asset-id"; payload: string }
  | { type: "set-asset-ids"; payload: string[] }
  | { type: "set-file-type"; payload: FileType }
  | { type: "set-search-query"; payload: string }
  | { type: "remove-asset-id"; payload: string }
  | { type: "set-can-select-files"; payload: boolean }
  | { type: "remove-upload-progress"; payload: string }
  | { type: "add-upload-progress"; payload: UploadProgress }
  | { type: "update-upload-progress"; payload: { fileId: string; progress: number } }
  | { type: "update-upload-status"; payload: { fileId: string; status: FileStatus } }
