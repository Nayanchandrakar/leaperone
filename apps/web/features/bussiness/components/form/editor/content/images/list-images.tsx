import { Input } from "@app/ui/components/input"
import { useCallback } from "react"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface ListImagesFormProps {
  sectionIdx: number
}

export function ListImagesForm({ sectionIdx }: ListImagesFormProps) {
  const section = useContentSection(sectionIdx)
  const updateItem = useContentEditorStore((state) => state.updateItem)
  const removeItem = useContentEditorStore((state) => state.removeItem)
  const moveItem = useContentEditorStore((state) => state.moveItem)

  const handleDataChange = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveItem(sectionIdx, ["images"], oldIndex, newIndex)
    },
    [sectionIdx, moveItem],
  )

  const handleTitleChange = useCallback(
    (imageIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "image-text-links") {
        const currentImage = section.images[imageIdx]
        updateItem(sectionIdx, ["images"], imageIdx, {
          ...currentImage,
          title: e.target.value,
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleLinkChange = useCallback(
    (imageIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "image-text-links") {
        const currentImage = section.images[imageIdx]
        updateItem(sectionIdx, ["images"], imageIdx, {
          ...currentImage,
          link: e.target.value,
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleDelete = useCallback(
    (imageIdx: number) => {
      removeItem(sectionIdx, ["images"], imageIdx)
    },
    [sectionIdx, removeItem],
  )

  if (section.type !== "image-text-links") return null
  const hasAnyImages = section.images?.length > 0
  if (!hasAnyImages) return null

  return (
    <EditorSortProvider data={section.images} onDataChange={handleDataChange}>
      <EditorSortGroup>
        {(img: any, imageIdx: number) => (
          <EditorSubSortItem id={img.id} key={img.id} onDelete={() => handleDelete(imageIdx)}>
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
          </EditorSubSortItem>
        )}
      </EditorSortGroup>
    </EditorSortProvider>
  )
}
