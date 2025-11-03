import { create } from "zustand"
import type { FileStatus, uploadProgressList } from "@/features/dashboard/types"

type AssetStore = {
  isSelectionMode: boolean
  selectedAssetIds: string[]
  uploadProgressList: uploadProgressList[]

  hasActiveUploads: () => boolean
  clearSelectedAssetIds: () => void
  addSelectedAssetId: (id: string) => void
  removeSelectedAssetId: (id: string) => void
  setSelectedAssetIds: (ids: string[]) => void
  toggleSelectionMode: (value: boolean) => void
  addUploadProgress: (progress: uploadProgressList) => void
  updateUploadProgress: (fileId: string, progress: number) => void
  updateUploadStatus: (fileId: string, status: FileStatus) => void
}

export const useAssetStore = create<AssetStore>()((set, get) => ({
  isSelectionMode: false,
  selectedAssetIds: [],
  uploadProgressList: [],

  toggleSelectionMode: (value) => {
    set({ isSelectionMode: value })
  },

  setSelectedAssetIds: (ids) => {
    set({ selectedAssetIds: ids })
  },

  addSelectedAssetId: (id) => {
    set((state) => ({ selectedAssetIds: [...state.selectedAssetIds, id] }))
  },

  removeSelectedAssetId: (id) => {
    set((state) => ({
      selectedAssetIds: state.selectedAssetIds.filter((selectedId) => selectedId !== id),
    }))
  },

  clearSelectedAssetIds: () => {
    set({ selectedAssetIds: [] })
  },

  addUploadProgress: (progress) => {
    set((state) => ({
      uploadProgressList: [...state.uploadProgressList, progress],
    }))
  },

  updateUploadProgress: (fileId, progress) => {
    set((state) => ({
      uploadProgressList: state.uploadProgressList.map((item) =>
        item.fileId === fileId ? { ...item, progress } : item,
      ),
    }))
  },

  updateUploadStatus: (fileId, status) => {
    set((state) => ({
      uploadProgressList: state.uploadProgressList.map((item) =>
        item.fileId === fileId ? { ...item, status } : item,
      ),
    }))
  },

  hasActiveUploads: () => {
    return get().uploadProgressList.some(({ status }) => status === "uploading")
  },
}))
