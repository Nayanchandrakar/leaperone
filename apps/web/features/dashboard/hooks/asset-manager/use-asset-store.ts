import { create } from "zustand"
import type { FileStatus, FileUploadProgress } from "@/features/dashboard/types"

type StoreProps = {
  showCheckboxes: boolean
  selectedCards: string[]
  addSelectedCard: (id: string) => void
  fileUploadProgress: FileUploadProgress[]
  removeSelectedCard: (id: string) => void
  setShowCheckboxes: (value: boolean) => void
  setSelectedCards: (values: string[]) => void
  updateUploadStatus: (fileId: string, status: FileStatus) => void
  updateUploadProgress: (fileId: string, progress: number) => void
  setFileUploadProgress: (uploadProgress: FileUploadProgress) => void
  removeAllSelectedCards: () => void
}

export const useAssetStore = create<StoreProps>()((set) => ({
  selectedCards: [],
  fileUploadProgress: [],
  showCheckboxes: false,

  updateUploadProgress: (id: string, progress: number) => {
    set((state) => ({
      fileUploadProgress: state.fileUploadProgress.map((item) =>
        item.fileId === id ? { ...item, progress } : item,
      ),
    }))
  },

  updateUploadStatus: (id: string, status: FileStatus) => {
    set((state) => ({
      fileUploadProgress: state.fileUploadProgress.map((item) =>
        item.fileId === id ? { ...item, status } : item,
      ),
    }))
  },

  setFileUploadProgress: (uploadProgress: FileUploadProgress) => {
    set((state) => ({
      fileUploadProgress: [...state.fileUploadProgress, uploadProgress],
    }))
  },

  setShowCheckboxes: (value: boolean) => {
    set(() => ({ showCheckboxes: value }))
  },

  setSelectedCards: (value: string[]) => {
    set(() => ({ selectedCards: value }))
  },

  removeSelectedCard: (id) => {
    set((state) => ({ selectedCards: state.selectedCards.filter((c) => c !== id) }))
  },

  addSelectedCard: (id: string) => {
    set((state) => ({ selectedCards: [...state.selectedCards, id] }))
  },

  removeAllSelectedCards: () => {
    set(() => ({ selectedCards: [] }))
  },
}))
