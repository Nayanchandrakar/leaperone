import { useCallback, useMemo } from "react"
import { useShallow } from "zustand/react/shallow"
import {
  selectSubSectionField,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"

export const useSubSectionField = <T = unknown>(
  index: number,
  subIndex: number,
  arrayPath: string[],
  fieldPath: string[],
) => {
  // Memoize the selector
  const selector = useMemo(
    () => selectSubSectionField(index, subIndex, arrayPath, fieldPath),
    [index, subIndex, arrayPath, fieldPath],
  )

  const value = useContentEditorStore(useShallow(selector)) as T

  const updateSubSectionField = useContentEditorStore((state) => state.updateSubSectionField)

  const setValue = useCallback(
    (newValue: T) => {
      updateSubSectionField(index, subIndex, arrayPath, fieldPath, newValue)
    },
    [index, subIndex, arrayPath, fieldPath, updateSubSectionField],
  )

  return [value, setValue] as const
}
