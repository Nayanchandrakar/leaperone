import type { ImagesTextLinksSection } from "@app/core/types/content-editor"
import { Input } from "@app/ui/components/input"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ListImagesForm = memo(({ index }: ContentSectionProps) => {
  const { updateSubSectionField, removeSubSectionItem, images } = useContentEditorStore(
    useShallow((state) => ({
      removeSubSectionItem: state.removeSubSectionItem,
      updateSubSectionField: state.updateSubSectionField,
      images: (state?.sections?.[index] as ImagesTextLinksSection)?.images,
    })),
  )

  if (!images?.length) return null

  return (
    <SortableList
      items={images}
      renderItem={(img, imageIdx) => (
        <SortableSubListItem
          key={img?.id}
          itemId={img?.id}
          onItemDelete={() => removeSubSectionItem(index, imageIdx, ["images"])}
        >
          <div className="flex flex-col gap-4 @lg/editor-sub-sort:flex-row">
            <EditorImageUploader src={img?.imageSrc} />
            <div className="flex flex-col gap-4 justify-center w-full">
              <Input
                placeholder="Image Title (Optional)"
                value={img?.title ?? ""}
                onChange={(e) =>
                  updateSubSectionField(
                    index,
                    imageIdx,
                    ["images"],
                    ["title"],
                    e?.target?.value ?? "",
                  )
                }
              />
              <Input
                placeholder="Link URL for clickable image (Optional)"
                value={img?.link ?? ""}
                onChange={(e) =>
                  updateSubSectionField(
                    index,
                    imageIdx,
                    ["images"],
                    ["link"],
                    e?.target?.value ?? "",
                  )
                }
              />
            </div>
          </div>
        </SortableSubListItem>
      )}
    />
  )
})
