import { useCallback, useMemo } from "react"
import {
  selectSubSectionField,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"

export function useSubSectionField<T = unknown>(
  index: number,
  subIndex: number,
  arrayPath: string[],
  fieldPath: string[],
) {
  // Memoize paths to avoid reference changes triggering re-renders
  const stableArrayPathKey = JSON.stringify(arrayPath)
  const stableFieldPathKey = JSON.stringify(fieldPath)

  const stableArrayPath = useMemo(() => JSON.parse(stableArrayPathKey), [stableArrayPathKey])
  const stableFieldPath = useMemo(() => JSON.parse(stableFieldPathKey), [stableFieldPathKey])

  // Memoize the selector
  const selector = useMemo(
    () => selectSubSectionField(index, subIndex, stableArrayPath, stableFieldPath),
    [index, subIndex, stableArrayPath, stableFieldPath],
  )

  const value = useContentEditorStore(selector) as T

  const updateSubSectionField = useContentEditorStore((state) => state.updateSubSectionField)

  const setValue = useCallback(
    (newValue: T) => {
      updateSubSectionField(index, subIndex, stableArrayPath, stableFieldPath, newValue)
    },
    [index, subIndex, stableArrayPath, stableFieldPath, updateSubSectionField],
  )

  return [value, setValue] as const
}
