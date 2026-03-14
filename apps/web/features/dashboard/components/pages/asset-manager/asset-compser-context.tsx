"use client"

import type { Dispatch } from "react"
import { createContext } from "react"
import { useAssetComposerState } from "@/features/dashboard/hooks/asset-manager/use-asset-composer-state"
import type { AssetFile, FileType, SortBy, UploadProgress } from "@/features/dashboard/types"
import type { AssetComposerAction } from "@/features/dashboard/types/composer-state-actions"

export interface AssetLocalState {
  sortBy: SortBy
  assetIds: string[]
  fileType: FileType
  searchQuery: string
  canSelectFiles: boolean
  uploadProgress: UploadProgress[]
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

export interface AssetComposerActions {
  fetchNextPage: () => void
  dispatch: Dispatch<AssetComposerAction>
}

export type AssetComposerMeta = {
  inputPlaceholder: string
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
}

export const AssetComposerContext = createContext<AssetComposerContextValue | null>(null)

export function AssetComposerProvider({ meta, fileType, children }: AssetComposerProviderProps) {
  const { state, actions } = useAssetComposerState(fileType)
  return (
    <AssetComposerContext.Provider value={{ state, actions, meta }}>
      {children}
    </AssetComposerContext.Provider>
  )
}
