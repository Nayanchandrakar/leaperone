import type { QrCodeEditor } from "@app/types"
import { create } from "zustand"

interface ShareBusinessCardState {
  isOpen: boolean
  autoDownload: boolean
  closeDialog: () => void
  identifier: string | null
  qrCode: QrCodeEditor | null
  openDialog: (params: { identifier: string; qrCode: QrCodeEditor; autoDownload?: boolean }) => void
}

export const useShareBusinessCard = create<ShareBusinessCardState>((set) => ({
  isOpen: false,
  qrCode: null,
  identifier: null,
  autoDownload: false,

  openDialog: ({ identifier, qrCode, autoDownload = false }) => {
    set({
      qrCode,
      identifier,
      isOpen: true,
      autoDownload,
    })
  },

  closeDialog: () => {
    set({ isOpen: false })
    setTimeout(() => {
      set({ qrCode: null, identifier: null, autoDownload: false })
    }, 300)
  },
}))
