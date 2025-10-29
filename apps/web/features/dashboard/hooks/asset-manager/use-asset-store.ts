import { create } from "zustand"
import type { FileStatus, FileUploadProgress } from "@/features/dashboard/types"

type StoreProps = {
  fileUploadProgress: FileUploadProgress[]
  updateUploadStatus: (fileId: string, status: FileStatus) => void
  updateUploadProgress: (fileId: string, progress: number) => void
  setFileUploadProgress: (uploadProgress: FileUploadProgress) => void
}

export const useAssetStore = create<StoreProps>()((set) => ({
  fileUploadProgress: [],

  updateUploadProgress(id, progress) {
    return set((state) => ({
      fileUploadProgress: state.fileUploadProgress.map((item) =>
        item.fileId === id ? { ...item, progress } : item,
      ),
    }))
  },

  updateUploadStatus(id, status) {
    return set((state) => ({
      fileUploadProgress: state.fileUploadProgress.map((item) =>
        item.fileId === id ? { ...item, status } : item,
      ),
    }))
  },

  setFileUploadProgress(uploadProgress) {
    return set((state) => ({ fileUploadProgress: [...state.fileUploadProgress, uploadProgress] }))
  },
}))
