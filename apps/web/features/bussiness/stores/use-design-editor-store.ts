import type {
  CardImage,
  CardSettings,
  Color,
  DesignEditor,
  SectionBackground,
} from "@app/core/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { DEFAULT_DESIGN_SETTINGS } from "@/features/bussiness/constants/home/default-design-settings"

type DesignEditorState = {
  config: DesignEditor
}

type DesignEditorActions = {
  setColor: (color: Color) => void
  setSectionBackground: <K extends keyof SectionBackground>(
    field: K,
    value: SectionBackground[K],
  ) => void
  setColorField: <K extends keyof Color>(field: K, value: Color[K]) => void
  setCardImageUrl: <K extends keyof CardImage>(field: K, value: CardImage[K]) => void
  setSettings: <K extends keyof CardSettings>(field: K, value: CardSettings[K]) => void
  reset: () => void
}

export const useDesignEditorStore = create<DesignEditorState & DesignEditorActions>()(
  immer((set) => ({
    config: DEFAULT_DESIGN_SETTINGS,

    setColor: (color) =>
      set((state) => {
        state.config.color = color
      }),

    setColorField: (field, value) =>
      set((state) => {
        state.config.color[field] = value
      }),

    setSectionBackground: (field, value) =>
      set((state) => {
        state.config.sectionBackground[field] = value
      }),

    setCardImageUrl: (field, value) =>
      set((state) => {
        state.config.cardImage[field] = value
      }),

    setSettings: (field, value) =>
      set((state) => {
        state.config.settings[field] = value
      }),

    reset: () => set({ config: DEFAULT_DESIGN_SETTINGS }),
  })),
)
