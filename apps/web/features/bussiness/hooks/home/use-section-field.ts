import { useCallback, useMemo } from "react"
import { useShallow } from "zustand/react/shallow"
import {
  selectSectionField,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"

export const useSectionField = <T = unknown>(index: number, path: string[]) => {
  // Memoize the selector to prevent unnecessary re-creations
  const selector = useMemo(() => selectSectionField(index, path), [index, path])

  // Use useShallow to prevent unnecessary re-renders if the value is an object
  // checking reference equality might be safer for primitives but useShallow works for both if used carefully
  // but selectSectionField returns the value directly.
  // If we assume primitive values or specific object references, straight selector is fine.
  // Using useShallow is generally safe for store subscriptions.
  const value = useContentEditorStore(useShallow(selector)) as T

  const updateSectionField = useContentEditorStore((state) => state.updateSectionField)

  const setValue = useCallback(
    (newValue: T) => {
      updateSectionField(index, path, newValue)
    },
    [index, path, updateSectionField],
  )

  return [value, setValue] as const
}
