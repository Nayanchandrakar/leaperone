import type { Contact } from "@app/core/types"
import { memo, useCallback } from "react"
import { QuickContactItemRenderer } from "@/features/bussiness/components/form/editor/content/profile/quick-contact-item-renderer"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const QuickContactLinksForm = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<Contact>(index, ["contacts", "list"])

  const handleRemoveItem = useCallback(
    (subIndex: number) => {
      removeItem(subIndex)
    },
    [removeItem],
  )

  const renderItem = useCallback(
    (contact: Contact, contactIdx: number) => (
      <QuickContactItemRenderer
        index={index}
        key={contact?.id}
        itemId={contact?.id}
        subIndex={contactIdx}
        onDelete={handleRemoveItem}
      />
    ),
    [index, handleRemoveItem],
  )

  if (!list?.length) return null

  return <SortableList items={list} onReorder={moveItem} renderItem={renderItem} />
})

QuickContactLinksForm.displayName = "QuickContactLinksForm"
