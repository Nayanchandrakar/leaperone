import type { ContactItem } from "@app/core/types"
import { memo } from "react"
import { ContactItemRenderer } from "@/features/bussiness/components/form/editor/content/contact/contact-item-renderer"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ContactItemsList = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<ContactItem>(index, ["items"])

  if (!list?.length) {
    return null
  }

  return (
    <SortableList
      items={list}
      onReorder={moveItem}
      renderItem={(contactItem: ContactItem, currentIndex: number) => (
        <ContactItemRenderer
          index={index}
          item={contactItem}
          key={contactItem.id}
          subIndex={currentIndex}
          onDelete={() => removeItem(currentIndex)}
        />
      )}
    />
  )
})
