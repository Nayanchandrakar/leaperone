import type { Gradient, QrCodeEditor } from "@app/core/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { QR_CODE_SETTINGS } from "@/features/bussiness/constants/home/qr-code-settings"

type QrCodeEditorState = QrCodeEditor

type QrCodeEditorActions = {
  // Basic field actions
  setData: (data: string) => void
  setBodyShape: (shape: QrCodeEditor["bodyShape"]) => void
  setCornerStyle: (style: QrCodeEditor["cornerStyle"]) => void
  setPatternStyle: (style: QrCodeEditor["patternStyle"]) => void

  // Fill actions
  setFillType: (type: QrCodeEditor["fill"]["type"]) => void
  setFillColor: (color: string) => void
  setFillGradient: (gradient: Gradient) => void
  updateGradientField: <T extends keyof Gradient>(field: T, value: Gradient[T]) => void

  // Logo actions (optional fields)
  setLogo: (logo: QrCodeEditor["logo"]) => void

  // Frame actions (optional fields)
  setFrame: (frame: QrCodeEditor["frame"]) => void

  // Generic field updater
  updateField: (path: string[], value: any) => void

  // Reset
  reset: () => void
}

const initialState: QrCodeEditorState = QR_CODE_SETTINGS

export const useQrCodeEditorStore = create<QrCodeEditorState & QrCodeEditorActions>()(
  immer((set) => ({
    ...initialState,

    setData: (data) =>
      set((state) => {
        state.data = data
      }),

    setBodyShape: (shape) =>
      set((state) => {
        state.bodyShape = shape
      }),

    setCornerStyle: (style) =>
      set((state) => {
        state.cornerStyle = style
      }),

    setPatternStyle: (style) =>
      set((state) => {
        state.patternStyle = style
      }),

    setFillType: (type) =>
      set((state) => {
        state.fill.type = type
        // Clear opposite type fields
        if (type === "single") {
          state.fill.color = "#000000"
          state.fill.fillGradient = undefined
        } else {
          state.fill.color = undefined
          if (!state.fill.fillGradient) {
            state.fill.fillGradient = {
              colorStops: ["#000000", "#1ba124"],
              rotation: 120,
              type: "linear",
            }
          }
        }
      }),

    setFillColor: (color) =>
      set((state) => {
        state.fill.color = color
      }),

    setFillGradient: (gradient) =>
      set((state) => {
        state.fill.fillGradient = gradient
      }),

    updateGradientField: (field, value) =>
      set((state) => {
        if (state.fill.fillGradient) {
          state.fill.fillGradient[field] = value as any
        }
      }),

    setLogo: (logo) =>
      set((state) => {
        state.logo = logo
      }),

    setFrame: (frame) =>
      set((state) => {
        state.frame = frame
      }),

    updateField: (path, value) =>
      set((state) => {
        let target: any = state
        for (let i = 0; i < path.length - 1; i++) {
          target = target[path[i]]
        }
        target[path[path.length - 1]] = value
      }),

    reset: () => set(initialState),
  })),
)

// Selectors
export const useQrCodeData = () => useQrCodeEditorStore((state) => state.data)
export const useQrCodeBodyShape = () => useQrCodeEditorStore((state) => state.bodyShape)
export const useQrCodeCornerStyle = () => useQrCodeEditorStore((state) => state.cornerStyle)
export const useQrCodePatternStyle = () => useQrCodeEditorStore((state) => state.patternStyle)
export const useQrCodeFill = () => useQrCodeEditorStore((state) => state.fill)
export const useQrCodeLogo = () => useQrCodeEditorStore((state) => state.logo)
export const useQrCodeFrame = () => useQrCodeEditorStore((state) => state.frame)
