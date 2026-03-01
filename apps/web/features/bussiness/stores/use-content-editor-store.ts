import type { ContentSection, ContentSectionType, Template } from "@app/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { CLASSIC_CONTENT } from "@/features/bussiness/constants/contents/classic-content"
import { SECTION_FACTORIES } from "@/features/bussiness/constants/contents/section-factories"

type ContentEditorState = {
  template: Template
  sections: ContentSection[]
}

type ContentEditorActions = {
  setTemplate: (template: Template) => void
  addSection: (type: ContentSectionType) => void
  updateSectionField: (index: number, field: string[], value: unknown) => void
  updateSubSectionField: (
    index: number,
    subIndex: number,
    arrayField: string[],
    field: string[],
    value: unknown,
  ) => void
  moveSection: (fromIndex: number, toIndex: number) => void
  setAllContent: (sections: ContentSection[], template: Template) => void
  pushSubSectionItem: (index: number, field: string[], item: unknown) => void
  removeSubSectionItem: (index: number, subIndex: number, field: string[]) => void
  moveSubSection: (index: number, field: string[], fromIndex: number, toIndex: number) => void
  reset: () => void
}

const initialState: ContentEditorState = {
  template: "classic",
  sections: CLASSIC_CONTENT,
}

export const useContentEditorStore = create<ContentEditorState & ContentEditorActions>()(
  immer((set) => ({
    ...initialState,

    setTemplate: (template) => {
      set((state) => {
        state.template = template
      })
    },

    updateSectionField: (index, path, value) => {
      set((state) => {
        let target = state.sections[index] as Record<string, any>
        for (let i = 0; i < path.length - 1; i++) {
          target = target[path[i]!]
        }
        target[path[path.length - 1]!] = value
      })
    },

    updateSubSectionField: (index, subIndex, arrayField, path, value) => {
      set((state) => {
        const section = state.sections[index] as Record<string, any>

        // Navigate to the array field (e.g., ["members"], ["contacts", "list"], etc.)
        let target: any = section
        for (const key of arrayField) {
          target = target[key]
        }

        // Validate that we have an array
        if (!Array.isArray(target)) return

        // Validate index
        if (subIndex < 0 || subIndex >= target?.length) return

        // Get the subsection item
        let subsectionItem = target[subIndex] as Record<string, any>

        // Navigate through the path to the target field within the subsection item
        for (let i = 0; i < path.length - 1; i++) {
          subsectionItem = subsectionItem[path[i]!]
        }

        // For Date objects, ensure we create a new instance so immer detects the change

        const finalValue = value instanceof Date ? new Date(value) : value

        // Set the final value
        subsectionItem[path[path.length - 1]!] = finalValue
      })
    },

    removeSubSectionItem(index, subIndex, field) {
      set((state) => {
        let target: any = state.sections[index] as Record<string, any>
        for (const key of field) {
          target = target[key]
        }
        target.splice(subIndex, 1)
      })
    },

    pushSubSectionItem: (index, field, item) => {
      set((state) => {
        let target = state.sections[index] as Record<string, any>
        for (const key of field) {
          target = target[key]
        }
        target.push(item)
      })
    },

    moveSection(fromIndex, toIndex) {
      set((state) => {
        const [removed] = state.sections.splice(fromIndex, 1)
        state.sections.splice(toIndex, 0, removed!)
      })
    },

    moveSubSection: (index, field, fromIndex, toIndex) => {
      set((state) => {
        let target = state.sections[index] as Record<string, any>
        for (const key of field) {
          target = target[key]
        }
        const [removed] = target.splice(fromIndex, 1)
        target.splice(toIndex, 0, removed)
      })
    },

    addSection: (sectionType) => {
      set((state) => {
        const factory = SECTION_FACTORIES[sectionType]
        if (!factory) return

        // Create a new section with fresh IDs
        const newSection = factory()
        state.sections.push(newSection)
      })
    },

    setAllContent: (sections, template) => {
      set((state) => {
        state.sections = sections
        state.template = template
      })
    },

    reset: () => set({ ...initialState }),
  })),
)

// Selector Factories for stable access
export const selectSectionEnabled = (index: number) => (state: ContentEditorState) => {
  return state.sections[index]?.enabled
}

// Selector for section id
export const selectSectionId = (index: number) => (state: ContentEditorState) => {
  return state.sections[index]?.id
}

// Generic field selector
export const selectSectionField = (index: number, path: string[]) => {
  return (state: ContentEditorState) => {
    let target: any = state.sections[index]
    for (const key of path) {
      if (!target) return undefined
      target = target[key]
    }
    return target
  }
}

// Sub-section generic selector
export const selectSubSectionField = (
  index: number,
  subIndex: number,
  arrayPath: string[],
  fieldPath: string[],
) => {
  return (state: ContentEditorState) => {
    let target: any = state.sections[index]
    // Navigate to array
    for (const key of arrayPath) {
      if (!target) return undefined
      target = target[key]
    }
    // Get item
    if (!Array.isArray(target) || !target[subIndex]) return undefined
    target = target[subIndex]
    // Navigate field
    for (const key of fieldPath) {
      if (!target) return undefined
      target = target[key]
    }
    return target
  }
}
