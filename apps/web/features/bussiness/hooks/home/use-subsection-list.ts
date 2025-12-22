import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

export const useSubSectionList = <T = unknown>(index: number, path: string[]) => {
  const list = useContentEditorStore(
    useShallow((state) => {
      let target: any = state.sections[index]
      for (const key of path) {
        if (!target) return []
        target = target[key]
      }
      return (target as T[]) ?? []
    }),
  )

  const { pushSubSectionItem, removeSubSectionItem, moveSubSection } = useContentEditorStore(
    useShallow((state) => ({
      pushSubSectionItem: state.pushSubSectionItem,
      removeSubSectionItem: state.removeSubSectionItem,
      moveSubSection: state.moveSubSection,
    })),
  )

  const addItem = useCallback(
    (item: T) => {
      pushSubSectionItem(index, path, item)
    },
    [index, path, pushSubSectionItem],
  )

  const removeItem = useCallback(
    (subIndex: number) => {
      removeSubSectionItem(index, subIndex, path)
    },
    [index, path, removeSubSectionItem],
  )

  const moveItem = useCallback(
    (fromIndex: number, toIndex: number) => {
      moveSubSection(index, path, fromIndex, toIndex)
    },
    [index, path, moveSubSection],
  )

  return {
    list,
    addItem,
    removeItem,
    moveItem,
  }
}
