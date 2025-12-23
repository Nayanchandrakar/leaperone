import { Input } from "@app/ui/components/input"
import { memo, useCallback } from "react"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface ImageLinkItemRendererProps {
  itemId: string
  index: number
  subIndex: number
  onDelete: (index: number) => void
  imageSrc: string
}

export const ImageLinkItemRenderer = memo(
  ({ itemId, index, subIndex, onDelete, imageSrc }: ImageLinkItemRendererProps) => {
    const [title, setTitle] = useSubSectionField<string>(index, subIndex, ["images"], ["title"])
    const [link, setLink] = useSubSectionField<string>(index, subIndex, ["images"], ["link"])

    const handleDelete = useCallback(() => {
      onDelete(subIndex)
    }, [onDelete, subIndex])

    const handleTitleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e?.target?.value)
      },
      [setTitle],
    )

    const handleLinkChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e?.target?.value)
      },
      [setLink],
    )

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={handleDelete}>
        <div className="flex flex-col gap-4 @lg/editor-sub-sort:flex-row">
          <EditorImageUploader src={imageSrc} />
          <div className="flex flex-col gap-4 justify-center w-full">
            <Input
              value={title}
              placeholder="Image Title (Optional)"
              onChange={handleTitleChange}
            />
            <Input
              value={link}
              onChange={handleLinkChange}
              placeholder="Link URL for clickable image (Optional)"
            />
          </div>
        </div>
      </SortableSubListItem>
    )
  },
)

ImageLinkItemRenderer.displayName = "ImageLinkItemRenderer"
