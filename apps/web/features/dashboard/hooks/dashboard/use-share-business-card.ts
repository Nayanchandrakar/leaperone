import type { QrCodeEditor } from "@app/types"
import { create } from "zustand"

interface ShareBusinessCardState {
  isOpen: boolean
  qrCodeOptions: QrCodeEditor | null
  identifier: string | null
  openDialog: (params: { identifier: string; qrCodeOptions: QrCodeEditor }) => void
  closeDialog: () => void
}

export const useShareBusinessCard = create<ShareBusinessCardState>((set) => ({
  isOpen: false,
  qrCodeOptions: null,
  identifier: null,

  openDialog: ({ identifier, qrCodeOptions }) => {
    set({
      identifier,
      isOpen: true,
      qrCodeOptions,
    })
  },

  closeDialog: () => {
    set({ isOpen: false })
    setTimeout(() => {
      set({ qrCodeOptions: null, identifier: null })
    }, 300)
  },
}))
