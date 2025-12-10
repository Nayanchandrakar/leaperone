import type { Color, DesignEditor } from "@app/core/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { DEFAULT_DESIGN_SETTINGS } from "@/features/bussiness/constants/home/default-design-settings"

type DesignEditorState = DesignEditor

type DesignEditorActions = {
  // Background actions
  setBackground: (background: DesignEditor["background"]) => void
  updateBackgroundItem: (idx: number, url: string) => void

  // Color actions
  setColor: (color: Color) => void
  setColorField: <T extends keyof Color>(field: T, value: Color[T]) => void

  // Section background actions
  setSectionBackground: (field: keyof DesignEditor["sectionBackground"], value: any) => void

  // Card image actions
  setCardImageUrl: (url: string) => void

  // Settings actions
  setSettings: (field: keyof DesignEditor["settings"], value: any) => void

  // Generic field updater
  updateField: (path: string[], value: any) => void

  // Reset
  reset: () => void
}

const initialState: DesignEditorState = DEFAULT_DESIGN_SETTINGS

export const useDesignEditorStore = create<DesignEditorState & DesignEditorActions>()(
  immer((set) => ({
    ...initialState,

    setBackground: (background) =>
      set((state) => {
        state.background = background
      }),

    updateBackgroundItem: (idx, url) =>
      set((state) => {
        state.background[idx].url = url
      }),

    setColor: (color) =>
      set((state) => {
        state.color = color
      }),

    setColorField: (field, value) =>
      set((state) => {
        state.color[field] = value as any
      }),

    setSectionBackground: (field, value) =>
      set((state) => {
        state.sectionBackground[field] = value as any
      }),

    setCardImageUrl: (url) =>
      set((state) => {
        state.cardImage.url = url
      }),

    setSettings: (field, value) =>
      set((state) => {
        state.settings[field] = value as any
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
export const useDesignBackground = () => useDesignEditorStore((state) => state.background)
export const useDesignColor = () => useDesignEditorStore((state) => state.color)
export const useDesignSectionBackground = () =>
  useDesignEditorStore((state) => state.sectionBackground)
export const useDesignCardImage = () => useDesignEditorStore((state) => state.cardImage)
export const useDesignSettings = () => useDesignEditorStore((state) => state.settings)
