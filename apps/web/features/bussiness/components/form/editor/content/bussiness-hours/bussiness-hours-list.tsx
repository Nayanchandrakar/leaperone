import type { Period } from "@app/core/types"
import { memo, useCallback } from "react"
import { BussinessHoursItem } from "@/features/bussiness/components/form/editor/content/bussiness-hours/bussiness-hours-item"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const BussinessHoursList = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<Period>(index, ["timing", "periods"])

  const handleRemoveItem = useCallback(
    (subIndex: number) => {
      removeItem(subIndex)
    },
    [removeItem],
  )

  const renderItem = useCallback(
    (period: Period, periodIdx: number) => (
      <BussinessHoursItem
        index={index}
        key={period?.id}
        itemId={period?.id}
        subIndex={periodIdx}
        onDelete={handleRemoveItem}
      />
    ),
    [index, handleRemoveItem],
  )

  if (!list?.length) return null

  return <SortableList items={list} onReorder={moveItem} renderItem={renderItem} />
})
