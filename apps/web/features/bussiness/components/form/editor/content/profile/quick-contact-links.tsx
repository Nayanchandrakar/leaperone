import type { Contact } from "@app/core/types"
import { memo } from "react"
import { QuickContactItemRenderer } from "@/features/bussiness/components/form/editor/content/profile/quick-contact-item-renderer"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const QuickContactLinksForm = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<Contact>(index, ["contacts", "list"])

  if (!list?.length) {
    return null
  }

  return (
    <SortableList
      items={list}
      onReorder={moveItem}
      renderItem={(contact, contactIdx) => (
        <QuickContactItemRenderer
          index={index}
          key={contact.id}
          itemId={contact.id}
          subIndex={contactIdx}
          onDelete={() => removeItem(contactIdx)}
        />
      )}
    />
  )
})
