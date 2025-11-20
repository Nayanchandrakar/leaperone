import { useCallback, useState } from "react"

export const useEditorBlock = (item: string) => {
  const [currentItem, setCurrentItem] = useState<string>(item)

  const onToggle = useCallback(
    (newItem: string) => {
      if (currentItem !== newItem) {
        setCurrentItem(newItem)
      }
    },
    [currentItem],
  )

  return { currentItem, onToggle }
}
