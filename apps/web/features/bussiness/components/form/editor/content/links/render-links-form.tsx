import type { SocialLink } from "@app/types"
import { memo, useCallback } from "react"
import { LinkItemRenderer } from "@/features/bussiness/components/form/editor/content/links/link-item-renderer"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const RenderLinksForm = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<SocialLink>(index, ["links"])

  const handleRemoveItem = useCallback(
    (subIndex: number) => {
      removeItem(subIndex)
    },
    [removeItem],
  )

  const renderItem = useCallback(
    (link: SocialLink, i: number) => (
      <LinkItemRenderer
        subIndex={i}
        index={index}
        key={link?.id}
        itemId={link?.id}
        onDelete={handleRemoveItem}
      />
    ),
    [index, handleRemoveItem],
  )

  if (!list?.length) return null

  return <SortableList items={list} onReorder={moveItem} renderItem={renderItem} />
})
