import type {
  CardImage,
  CardSettings,
  Color,
  DesignEditor,
  Font,
  SectionBackground,
  Template,
} from "@app/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import {
  CLASSIC_DESIGN,
  TEMPLATE_DESIGN_MAP,
} from "@/features/bussiness/constants/home/template-designs"

type DesignEditorState = {
  config: DesignEditor
}

type DesignEditorActions = {
  setColor: (color: Color) => void
  setFont: (font: Font) => void
  setSectionBackground: <K extends keyof SectionBackground>(
    field: K,
    value: SectionBackground[K],
  ) => void
  setColorField: <K extends keyof Color>(field: K, value: Color[K]) => void
  setCardImageUrl: <K extends keyof CardImage>(field: K, value: CardImage[K]) => void
  setSettings: <K extends keyof CardSettings>(field: K, value: CardSettings[K]) => void
  setAllConfig: (config: DesignEditor) => void
  resetConfig: (template: Template) => void
}

export const useDesignEditorStore = create<DesignEditorState & DesignEditorActions>()(
  immer((set) => ({
    config: CLASSIC_DESIGN,

    setColor(color) {
      set((state) => {
        state.config.color = color
      })
    },

    setFont(font) {
      set((state) => {
        state.config.font = font
      })
    },

    setColorField(field, value) {
      set((state) => {
        state.config.color[field] = value
      })
    },

    setSectionBackground(field, value) {
      set((state) => {
        state.config.sectionBackground[field] = value
      })
    },

    setCardImageUrl(field, value) {
      set((state) => {
        state.config.cardImage[field] = value
      })
    },

    setSettings(field, value) {
      set((state) => {
        state.config.settings[field] = value
      })
    },

    setAllConfig(config) {
      set((state) => {
        state.config = config
      })
    },

    resetConfig(template) {
      set((state) => {
        state.config = TEMPLATE_DESIGN_MAP[template]
      })
    },
  })),
)
