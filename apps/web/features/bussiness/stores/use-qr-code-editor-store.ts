import type {
  QrCodeBodyShape,
  QrCodeCornerStyle,
  QrCodeEditor,
  QrCodeFill,
  QrCodePatternStyle,
} from "@app/core/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { QR_CODE_SETTINGS } from "@/features/bussiness/constants/home/qr-code-settings"

type QrCodeEditorState = {
  settings: QrCodeEditor
}

type QrCodeEditorActions = {
  // Basic field actions
  setData: (data: string) => void
  setLogo: (logo: string) => void
  setFillColor: (color: string) => void

  setBodyShape: (shape: QrCodeBodyShape) => void
  setCornerStyle: (style: QrCodeCornerStyle) => void
  setPatternStyle: (style: QrCodePatternStyle) => void
  setFillType: (type: QrCodeFill["type"]) => void

  // setBodyShape: (shape: QrCodeEditor["bodyShape"]) => void
  // setCornerStyle: (style: QrCodeEditor["cornerStyle"]) => void
  // setPatternStyle: (style: QrCodeEditor["patternStyle"]) => void

  // // Fill actions
  // setFillType: (type: QrCodeEditor["fill"]["type"]) => void
  // setFillGradient: (gradient: Gradient) => void
  // updateGradientField: <T extends keyof Gradient>(field: T, value: Gradient[T]) => void

  // // Logo actions (optional fields)
  // setLogo: (logo: QrCodeEditor["logo"]) => void

  // // Frame actions (optional fields)
  // setFrame: (frame: QrCodeEditor["frame"]) => void

  // // Generic field updater
  // updateField: (path: string[], value: any) => void

  // Reset
  reset: () => void
}

export const useQrCodeEditorStore = create<QrCodeEditorState & QrCodeEditorActions>()(
  immer((set) => ({
    settings: QR_CODE_SETTINGS,

    setData: (data) => {
      set((state) => {
        state.settings.data = data
      })
    },

    setLogo: (logo) => {
      set((state) => {
        state.settings.logo = logo
      })
    },

    setBodyShape: (shape) => {
      set((state) => {
        state.settings.bodyShape = shape
      })
    },

    setCornerStyle: (style) => {
      set((state) => {
        state.settings.cornerStyle = style
      })
    },

    setPatternStyle: (style) => {
      set((state) => {
        state.settings.patternStyle = style
      })
    },

    setFillType: (type) => {
      set((state) => {
        state.settings.fill.type = type
      })
    },

    setFillColor: (color) => {
      set((state) => {
        if (state.settings.fill.type === "single") {
          state.settings.fill.color = color
        }
      })
    },

    reset: () => {
      set({ settings: QR_CODE_SETTINGS })
    },
  })),
)
