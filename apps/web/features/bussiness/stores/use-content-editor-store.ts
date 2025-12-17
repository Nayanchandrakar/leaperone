import type { ContentSection } from "@app/core/types"
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { PROFESSIONAL_TEMPLATE } from "@/features/bussiness/constants/contents/professional-content"

type ContentEditorState = {
  templateId: string
  sections: ContentSection[]
}

type ContentEditorActions = {
  // Section-level actions
  // updateSection: <T extends keyof Array<ContentSection>[number]>(
  //   field: T,
  //   sectionIdx: number,
  //   value: ContentEditor["sections"][number][T],
  // ) => void
  // Nested field updates
  // Array operations for nested lists (contacts, links, images, etc.)
  // pushItem: (sectionIdx: number, path: string[], item: any) => void
  // removeItem: (sectionIdx: number, path: string[], itemIdx: number) => void
  // moveItem: (sectionIdx: number, path: string[], fromIdx: number, toIdx: number) => void
  // updateItem: (sectionIdx: number, path: string[], itemIdx: number, value: unknown) => void
  // Reset
  // reset: () => void
  // new actions

  updateSectionField: (index: number, field: string[], value: unknown) => void
  updateSubSectionField: (
    index: number,
    subIndex: number,
    arrayField: string[],
    field: string[],
    value: unknown,
  ) => void
  removeSubSectionItem: (index: number, subIndex: number, field: string[]) => void
  pushSubSectionItem: (index: number, field: string[], item: unknown) => void
}

const initialState: ContentEditorState = {
  templateId: "hello-world",
  sections: PROFESSIONAL_TEMPLATE,
}

export const useContentEditorStore = create<ContentEditorState & ContentEditorActions>()(
  immer((set) => ({
    ...initialState,

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

        // Set the final value
        subsectionItem[path[path.length - 1]!] = value
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

    // updateSection: (sectionIdx, field, value) =>
    //   set((state) => {
    //     state.sections[sectionIdx][field] = value as any
    //   }),

    // pushItem: (sectionIdx, path, item) =>
    // set((state) => {
    //   let target: any = state.sections[sectionIdx]
    //   for (const key of path) {
    //     target = target[key]
    //   }
    //   target.push(item)
    //   }),

    // removeItem: (sectionIdx, path, itemIdx) =>
    //   set((state) => {
    // let target: any = state.sections[sectionIdx]
    // for (const key of path) {
    //   target = target[key]
    // }
    // target.splice(itemIdx, 1)
    //   }),

    // moveItem: (sectionIdx, path, fromIdx, toIdx) =>
    //   set((state) => {
    //     let target: any = state.sections[sectionIdx]
    //     for (const key of path) {
    //       target = target[key]
    //     }
    //     const [removed] = target.splice(fromIdx, 1)
    //     target.splice(toIdx, 0, removed)
    //   }),

    // updateItem: (sectionIdx, path, itemIdx, value) =>
    //   set((state) => {
    //     let target: any = state.sections[sectionIdx]
    //     for (const key of path) {
    //       target = target[key]
    //     }
    //     target[itemIdx] = value
    //   }),

    // reset: () => set(initialState),
  })),
)
