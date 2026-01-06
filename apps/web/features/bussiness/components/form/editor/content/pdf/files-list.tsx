import type { PdfFile } from "@app/core/types"
import { memo, useCallback } from "react"
import { PdfFileItemRenderer } from "@/features/bussiness/components/form/editor/content/pdf/pdf-file-item-renderer"
import { SortableList } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const FilesList = memo(({ index }: ContentSectionProps) => {
  const { list, moveItem, removeItem } = useSubSectionList<PdfFile>(index, ["files"])

  const handleRemoveItem = useCallback(
    (subIndex: number) => {
      removeItem(subIndex)
    },
    [removeItem],
  )

  const renderItem = useCallback(
    (pdfFile: PdfFile, i: number) => (
      <PdfFileItemRenderer
        subIndex={i}
        index={index}
        key={pdfFile?.id}
        itemId={pdfFile?.id}
        onDelete={handleRemoveItem}
      />
    ),
    [index, handleRemoveItem],
  )

  if (!list?.length) return null

  return <SortableList items={list} onReorder={moveItem} renderItem={renderItem} />
})
