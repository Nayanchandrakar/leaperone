import { useCallback, useState } from "react"
import type { PanelType } from "@/types"

interface usePanelProps {
  type?: PanelType
  collapsible?: boolean
  defaultOpen?: string[]
}

export const usePanel = ({
  type = "single",
  defaultOpen = [],
  collapsible = false,
}: usePanelProps = {}) => {
  const [items, setItems] = useState<string[]>(defaultOpen)

  const checkIsOpen = useCallback((key: string) => items.includes(key), [items])

  const onTrigger = useCallback(
    (item: string) => {
      setItems((prev) => {
        const isOpen = prev.includes(item)

        if (isOpen) {
          if (type === "single") {
            return collapsible ? [] : prev
          }

          return prev.filter((i) => i !== item)
        }

        if (type === "single") {
          return [item]
        }
        return [...prev, item]
      })
    },
    [type, collapsible],
  )

  return { onTrigger, checkIsOpen }
}
