"use client"

import type { Dispatch } from "react"
import { createContext } from "react"
import { useAssetComposerState } from "@/features/dashboard/hooks/asset-manager/use-asset-composer-state"
import type {
  AssetFile,
  FileType,
  SelectedAsset,
  SortBy,
  UploadProgress,
} from "@/features/dashboard/types"
import type { AssetComposerAction } from "@/features/dashboard/types/composer-state-actions"

export interface AssetLocalState {
  sortBy: SortBy
  fileType: FileType
  searchQuery: string
  canSelectFiles: boolean
  uploadProgress: UploadProgress[]
  selectedAssets: SelectedAsset[]
}

export interface AssetComposerState extends AssetLocalState {
  isError: boolean
  isPending: boolean
  filesCount: number
  isFetching: boolean
  files?: AssetFile[]
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

export interface AssetComposerBaseActions {
  fetchNextPage: () => void
  dispatch: Dispatch<AssetComposerAction>
}

export interface AssetComposerActions extends AssetComposerBaseActions {
  onUpload: (assetUrls: string[]) => void
}

export interface AssetComposerMeta {
  searchPlaceholder: string
  uploadActionLabel?: string
}

interface AssetComposerContextValue {
  meta: AssetComposerMeta
  state: AssetComposerState
  actions: AssetComposerActions
}

interface AssetComposerProviderProps {
  fileType: FileType
  meta: AssetComposerMeta
  children: React.ReactNode
  onUpload?: (assetUrls: string[]) => void
}

export const AssetComposerContext = createContext<AssetComposerContextValue | null>(null)

export function AssetComposerProvider({
  meta,
  fileType,
  children,
  onUpload = () => {},
}: AssetComposerProviderProps) {
  const { state, actions } = useAssetComposerState(fileType)

  return (
    <AssetComposerContext.Provider value={{ state, actions: { ...actions, onUpload }, meta }}>
      {children}
    </AssetComposerContext.Provider>
  )
}
