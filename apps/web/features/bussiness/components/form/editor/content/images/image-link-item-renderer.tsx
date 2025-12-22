import { Input } from "@app/ui/components/input"
import { memo } from "react"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface ImageLinkItemRendererProps {
  itemId: string
  index: number
  subIndex: number
  onDelete: () => void
  imageSrc: string
}

export const ImageLinkItemRenderer = memo(
  ({ itemId, index, subIndex, onDelete, imageSrc }: ImageLinkItemRendererProps) => {
    const [title, setTitle] = useSubSectionField<string>(index, subIndex, ["images"], ["title"])
    const [link, setLink] = useSubSectionField<string>(index, subIndex, ["images"], ["link"])

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={onDelete}>
        <div className="flex flex-col gap-4 @lg/editor-sub-sort:flex-row">
          <EditorImageUploader src={imageSrc} />
          <div className="flex flex-col gap-4 justify-center w-full">
            <Input
              value={title}
              placeholder="Image Title (Optional)"
              onChange={(e) => setTitle(e?.target?.value)}
            />
            <Input
              value={link}
              onChange={(e) => setLink(e?.target?.value)}
              placeholder="Link URL for clickable image (Optional)"
            />
          </div>
        </div>
      </SortableSubListItem>
    )
  },
)
