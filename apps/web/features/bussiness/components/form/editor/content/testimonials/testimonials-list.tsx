import type { TestimonialMember } from "@app/core/types"
import { memo } from "react"
import { TestimonialItemRenderer } from "@/features/bussiness/components/form/editor/content/testimonials/testimonial-item-renderer"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const TestimonialsList = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<TestimonialMember>(index, [
    "testimonials",
  ])

  if (!list?.length) {
    return null
  }

  return (
    <SortableList
      items={list}
      onReorder={moveItem}
      renderItem={(testimonial, i) => (
        <TestimonialItemRenderer
          subIndex={i}
          index={index}
          key={testimonial?.id}
          itemId={testimonial?.id}
          onDelete={() => removeItem(i)}
        />
      )}
    />
  )
})
