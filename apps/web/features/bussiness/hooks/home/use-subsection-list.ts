import { useCallback, useMemo } from "react"
import { useShallow } from "zustand/react/shallow"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

export function useSubSectionList<T>(index: number, path: (string | number)[]) {
  // Memoize the path array to avoid reference changes triggering re-renders
  const stablePathKey = JSON.stringify(path)
  const stablePath = useMemo(() => JSON.parse(stablePathKey), [stablePathKey])

  const list = useContentEditorStore(
    useShallow((state) => {
      let target: any = state.sections[index]
      for (const key of stablePath) {
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
      pushSubSectionItem(index, stablePath, item)
    },
    [index, stablePath, pushSubSectionItem],
  )

  const removeItem = useCallback(
    (subIndex: number) => {
      removeSubSectionItem(index, subIndex, stablePath)
    },
    [index, stablePath, removeSubSectionItem],
  )

  const moveItem = useCallback(
    (fromIndex: number, toIndex: number) => {
      moveSubSection(index, stablePath, fromIndex, toIndex)
    },
    [index, stablePath, moveSubSection],
  )

  return {
    list,
    addItem,
    removeItem,
    moveItem,
  }
}
