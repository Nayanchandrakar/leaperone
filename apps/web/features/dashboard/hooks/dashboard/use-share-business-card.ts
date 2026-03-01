import type { QrCodeEditor } from "@app/types"
import { create } from "zustand"

interface ShareBusinessCardState {
  isOpen: boolean
  qrCode: QrCodeEditor | null
  identifier: string | null
  openDialog: (params: { identifier: string; qrCode: QrCodeEditor }) => void
  closeDialog: () => void
}

export const useShareBusinessCard = create<ShareBusinessCardState>((set) => ({
  isOpen: false,
  qrCode: null,
  identifier: null,

  openDialog: ({ identifier, qrCode }) => {
    set({
      qrCode,
      identifier,
      isOpen: true,
    })
  },

  closeDialog: () => {
    set({ isOpen: false })
    setTimeout(() => {
      set({ qrCode: null, identifier: null })
    }, 300)
  },
}))
