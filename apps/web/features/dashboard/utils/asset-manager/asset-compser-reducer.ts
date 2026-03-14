import type { AssetLocalState } from "@/features/dashboard/components/pages/asset-manager/asset-compser-context"
import type { AssetComposerAction } from "@/features/dashboard/types/composer-state-actions"

export function assetComposerReducer(state: AssetLocalState, action: AssetComposerAction) {
  switch (action.type) {
    case "set-search-query": {
      return { ...state, searchQuery: action.payload }
    }
    case "set-file-type": {
      return { ...state, fileType: action.payload }
    }
    case "set-sort-by": {
      return { ...state, sortBy: action.payload }
    }
    case "set-can-select-files": {
      return { ...state, canSelectFiles: action.payload }
    }
    case "add-upload-progress": {
      return { ...state, uploadProgress: [...state.uploadProgress, action.payload] }
    }
    case "update-upload-progress": {
      return {
        ...state,
        uploadProgress: state.uploadProgress.map((p) =>
          p.fileId === action.payload.fileId ? { ...p, progress: action.payload.progress } : p,
        ),
      }
    }
    case "update-upload-status": {
      return {
        ...state,
        uploadProgress: state.uploadProgress.map((p) =>
          p.fileId === action.payload.fileId ? { ...p, status: action.payload.status } : p,
        ),
      }
    }
    case "remove-upload-progress": {
      return {
        ...state,
        uploadProgress: state.uploadProgress.filter(({ fileId }) => fileId !== action.payload),
      }
    }
    case "set-asset-ids": {
      return { ...state, assetIds: action.payload }
    }
    case "clear-asset-ids": {
      return { ...state, assetIds: [] }
    }
    case "add-asset-id": {
      return state.assetIds.includes(action.payload)
        ? state
        : { ...state, assetIds: [...state.assetIds, action.payload] }
    }
    case "remove-asset-id": {
      return { ...state, assetIds: state.assetIds.filter((x) => x !== action.payload) }
    }
    default:
      return state
  }
}
