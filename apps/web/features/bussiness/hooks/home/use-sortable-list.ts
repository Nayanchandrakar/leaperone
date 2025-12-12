import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core"
import { useCallback } from "react"
import { create } from "zustand"
import type { SortData } from "@/features/bussiness/components/ui/sortable-list"

export const useSortableListStore = create<{
  activeCardId: string | null
  setActiveCardId: (id: string | null) => void
}>()((set) => ({
  activeCardId: null,
  setActiveCardId: (id) => set({ activeCardId: id }),
}))

export function useSortableListHandlers<T extends SortData>(
  data: T[],
  setActiveCardId: (id: string | null) => void,
  onDragStart?: (event: DragStartEvent) => void,
  onDragEnd?: (event: DragEndEvent) => void,
  onDataChange?: (fromIndex: number, toIndex: number) => void,
) {
  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const card = data.find((item) => item.id === event.active.id)
      if (card) setActiveCardId(card.id)
      onDragStart?.(event)
    },
    [data, onDragStart, setActiveCardId],
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveCardId(null)
      onDragEnd?.(event)
      const { active, over } = event
      if (!over || active.id === over.id) return
      const fromIndex = data.findIndex((item) => item.id === active.id)
      const toIndex = data.findIndex((item) => item.id === over.id)
      onDataChange?.(fromIndex, toIndex)
    },
    [data, onDataChange, onDragEnd, setActiveCardId],
  )
  return { handleDragStart, handleDragEnd }
}
