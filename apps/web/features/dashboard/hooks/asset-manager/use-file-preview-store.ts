import { create } from "zustand"
import type { AssetFile } from "@/features/dashboard/types"

type FilePreviewStore = {
  isOpen: boolean
  asset: AssetFile | null
  setIsOpen: (isOpen: boolean) => void
  setAsset: (asset: AssetFile | null) => void
}

export const useFilePreviewStore = create<FilePreviewStore>()((set) => ({
  asset: null,
  isOpen: false,
  setAsset: (asset) => set({ asset }),
  setIsOpen: (isOpen) => set({ isOpen }),
}))
