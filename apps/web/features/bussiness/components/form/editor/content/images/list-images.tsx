import type { ImagesTextLinksSection } from "@app/core/types/content-editor"
import { Input } from "@app/ui/components/input"
import { useShallow } from "zustand/react/shallow"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface ListImagesFormProps {
  index: number
}

export function ListImagesForm({ index }: ListImagesFormProps) {
  const { updateSubSectionField, removeSubSectionItem, images } = useContentEditorStore(
    useShallow((state) => ({
      section: state.sections[index] as ImagesTextLinksSection,
      updateSubSectionField: state.updateSubSectionField,
      removeSubSectionItem: state.removeSubSectionItem,
      images: (state.sections[index] as ImagesTextLinksSection).images,
    })),
  )

  if (images?.length === 0) return null

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
}
