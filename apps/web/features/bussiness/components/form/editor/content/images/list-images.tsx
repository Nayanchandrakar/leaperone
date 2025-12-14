import type { ImagesTextLinksSection } from "@app/core/types/content-editor"
import { Input } from "@app/ui/components/input"
import { useCallback } from "react"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface ListImagesFormProps {
  index: number
}

export function ListImagesForm({ index }: ListImagesFormProps) {
  const section = useContentEditorStore((state) => state.sections[index] as ImagesTextLinksSection)
  const updateItem = useContentEditorStore((state) => state.updateItem)
  const removeItem = useContentEditorStore((state) => state.removeItem)
  const moveItem = useContentEditorStore((state) => state.moveItem)

  const handleDataChange = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveItem(index, ["images"], oldIndex, newIndex)
    },
    [index, moveItem],
  )

  const handleTitleChange = useCallback(
    (imageIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "image-text-links") {
        const currentImage = section.images[imageIdx]
        updateItem(index, ["images"], imageIdx, {
          ...currentImage,
          title: e.target.value,
        })
      }
    },
    [section, index, updateItem],
  )

  const handleLinkChange = useCallback(
    (imageIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "image-text-links") {
        const currentImage = section.images[imageIdx]
        updateItem(index, ["images"], imageIdx, {
          ...currentImage,
          link: e.target.value,
        })
      }
    },
    [section, index, updateItem],
  )

  const handleDelete = useCallback(
    (imageIdx: number) => {
      removeItem(index, ["images"], imageIdx)
    },
    [index, removeItem],
  )

  if (section.type !== "image-text-links") return null
  const hasAnyImages = section.images?.length > 0
  if (!hasAnyImages) return null

  return (
    <SortableList
      items={section.images}
      onOrderChange={handleDataChange}
      renderItem={(img: any, imageIdx: number) => (
        <SortableSubListItem
          key={img.id}
          itemId={img.id}
          onItemDelete={() => handleDelete(imageIdx)}
        >
          <div className="flex flex-col gap-4 @lg/editor-sub-sort:flex-row">
            <EditorImageUploader src={img.imageSrc} />
            <div className="flex flex-col gap-4 justify-center w-full">
              <Input
                placeholder="Image Title (Optional)"
                value={img.title || ""}
                onChange={(e) => handleTitleChange(imageIdx, e)}
              />
              <Input
                placeholder="Link URL for clickable image (Optional)"
                value={img.link || ""}
                onChange={(e) => handleLinkChange(imageIdx, e)}
              />
            </div>
          </div>
        </SortableSubListItem>
      )}
    />
  )
}
