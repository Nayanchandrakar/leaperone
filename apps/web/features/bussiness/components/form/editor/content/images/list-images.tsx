import type { ImageLink } from "@app/core/types"
import { memo } from "react"
import { ImageLinkItemRenderer } from "@/features/bussiness/components/form/editor/content/images/image-link-item-renderer"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ListImagesForm = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<ImageLink>(index, ["images"])

  if (!list?.length) {
    return null
  }

  return (
    <SortableList
      items={list}
      onReorder={moveItem}
      renderItem={(img, i) => (
        <ImageLinkItemRenderer
          key={img.id}
          subIndex={i}
          index={index}
          itemId={img.id}
          imageSrc={img.imageSrc}
          onDelete={() => removeItem(i)}
        />
      )}
    />
  )
})
