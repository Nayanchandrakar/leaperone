import { create } from "zustand"
import type { FileStatus, FileUploadProgress } from "@/features/dashboard/types"

type StoreProps = {
  uploadProgress: FileUploadProgress[]
  updateStatus: (fileId: string, status: FileStatus) => void
  updateProgress: (fileId: string, progress: number) => void
  setUploadProgress: (uploadProgress: FileUploadProgress) => void
}

export const useUploadStore = create<StoreProps>()((set) => ({
  uploadProgress: [],

  updateProgress(id, progress) {
    return set((state) => ({
      uploadProgress: state.uploadProgress.map((item) =>
        item.fileId === id ? { ...item, progress } : item,
      ),
    }))
  },

  updateStatus(id, status) {
    return set((state) => ({
      uploadProgress: state.uploadProgress.map((item) =>
        item.fileId === id ? { ...item, status } : item,
      ),
    }))
  },

  setUploadProgress(uploadProgress) {
    return set((state) => ({ uploadProgress: [...state.uploadProgress, uploadProgress] }))
  },
}))
