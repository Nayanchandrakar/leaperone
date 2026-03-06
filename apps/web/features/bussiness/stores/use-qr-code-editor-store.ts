import type {
  Gradient,
  QrCodeBodyShape,
  QrCodeCornerStyle,
  QrCodeEditor,
  QrCodeFill,
  QrCodePatternStyle,
} from "@app/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { QR_CODE_SETTINGS } from "@/features/bussiness/constants/home/qr-code-settings"

type QrCodeEditorState = {
  settings: QrCodeEditor
}

type QrCodeEditorActions = {
  resetSettings: () => void
  setData: (data: string) => void
  setLogo: (logo: string) => void
  setFillColor: (color: string) => void
  setBodyShape: (shape: QrCodeBodyShape) => void
  setFillType: (type: QrCodeFill["type"]) => void
  setAllSettings: (settings: QrCodeEditor) => void
  setCornerStyle: (style: QrCodeCornerStyle) => void
  setPatternStyle: (style: QrCodePatternStyle) => void
  setGradientColorStop: (index: number, color: string) => void
  setFillGradient: <K extends keyof Gradient>(field: K, gradient: Gradient[K]) => void
}

export const useQrCodeEditorStore = create<QrCodeEditorState & QrCodeEditorActions>()(
  immer((set) => ({
    settings: QR_CODE_SETTINGS,

    setData(data) {
      set((state) => {
        state.settings.data = data
      })
    },

    setLogo(logo) {
      set((state) => {
        state.settings.logo = logo
      })
    },

    setBodyShape(shape) {
      set((state) => {
        state.settings.bodyShape = shape
      })
    },

    setCornerStyle(style) {
      set((state) => {
        state.settings.cornerStyle = style
      })
    },

    setPatternStyle(style) {
      set((state) => {
        state.settings.patternStyle = style
      })
    },

    setFillType(type) {
      set((state) => {
        state.settings.fill.type = type
      })
    },

    setFillColor(color) {
      set((state) => {
        if (state.settings.fill.type === "single") {
          state.settings.fill.color = color
        }
      })
    },

    setFillGradient(field, value) {
      set((state) => {
        if (state.settings.fill.type === "gradient") {
          state.settings.fill.fillGradient[field] = value
        }
      })
    },

    setGradientColorStop(index, color) {
      set((state) => {
        if (state.settings.fill.type === "gradient") {
          state.settings.fill.fillGradient.colorStops[index] = color
        }
      })
    },

    setAllSettings(settings) {
      set((state) => {
        state.settings = settings
      })
    },

    resetSettings() {
      set((state) => {
        state.settings = QR_CODE_SETTINGS
      })
    },
  })),
)
