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
  moveSection: (fromIndex: number, toIndex: number) => void

  // Nested field updates
  updateSectionField: (index: number, field: string[], value: unknown) => void

  // Array operations for nested lists (contacts, links, images, etc.)
  // pushItem: (sectionIdx: number, path: string[], item: any) => void
  // removeItem: (sectionIdx: number, path: string[], itemIdx: number) => void
  // moveItem: (sectionIdx: number, path: string[], fromIdx: number, toIdx: number) => void
  // updateItem: (sectionIdx: number, path: string[], itemIdx: number, value: any) => void

  // Reset
  // reset: () => void
}

const initialState: ContentEditorState = {
  templateId: "hello-world",
  sections: PROFESSIONAL_TEMPLATE,
}

export const useContentEditorStore = create<ContentEditorState & ContentEditorActions>()(
  immer((set) => ({
    ...initialState,

    // updateSection: (sectionIdx, field, value) =>
    //   set((state) => {
    //     state.sections[sectionIdx][field] = value as any
    //   }),

    moveSection: (fromIndex, toIndex) => {
      set((state) => {
        const [removed] = state.sections.splice(fromIndex, 1)
        state.sections.splice(toIndex, 0, removed!)
      })
    },

    updateSectionField: (sectionIdx, path, value) => {
      set((state) => {
        let target: any = state.sections[sectionIdx]
        for (let i = 0; i < path.length - 1; i++) {
          target = target[path[i]!]
        }
        target[path[path.length - 1]!] = value
      })
    },

    // pushItem: (sectionIdx, path, item) =>
    //   set((state) => {
    //     let target: any = state.sections[sectionIdx]
    //     for (const key of path) {
    //       target = target[key]
    //     }
    //     target.push(item)
    //   }),

    // removeItem: (sectionIdx, path, itemIdx) =>
    //   set((state) => {
    //     let target: any = state.sections[sectionIdx]
    //     for (const key of path) {
    //       target = target[key]
    //     }
    //     target.splice(itemIdx, 1)
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
