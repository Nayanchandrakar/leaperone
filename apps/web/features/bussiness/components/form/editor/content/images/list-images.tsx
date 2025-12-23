import type { ImageLink } from "@app/core/types"
import { memo, useCallback } from "react"
import { ImageLinkItemRenderer } from "@/features/bussiness/components/form/editor/content/images/image-link-item-renderer"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ListImagesForm = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<ImageLink>(index, ["images"])

  const handleRemoveItem = useCallback(
    (subIndex: number) => {
      removeItem(subIndex)
    },
    [removeItem],
  )

  const renderItem = useCallback(
    (img: ImageLink, i: number) => (
      <ImageLinkItemRenderer
        subIndex={i}
        key={img?.id}
        index={index}
        itemId={img?.id}
        imageSrc={img?.imageSrc}
        onDelete={handleRemoveItem}
      />
    ),
    [index, handleRemoveItem],
  )

  if (!list?.length) return null

  return <SortableList items={list} onReorder={moveItem} renderItem={renderItem} />
})

ListImagesForm.displayName = "ListImagesForm"
