import { Button } from "@app/ui/components/button"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Upload } from "lucide-react"
import { memo, useCallback } from "react"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface PdfFileItemRendererProps {
  itemId: string
  index: number
  subIndex: number
  onDelete: (index: number) => void
}

export const PdfFileItemRenderer = memo(
  ({ itemId, index, subIndex, onDelete }: PdfFileItemRendererProps) => {
    const [title, setTitle] = useSubSectionField<string>(
      index,
      subIndex,
      ["files"],
      ["title", "text"],
    )
    const [subTitle, setSubTitle] = useSubSectionField<string>(
      index,
      subIndex,
      ["files"],
      ["subTitle", "text"],
    )
    const [titleEnabled, setTitleEnabled] = useSubSectionField<boolean>(
      index,
      subIndex,
      ["files"],
      ["title", "enabled"],
    )
    const [subTitleEnabled, setSubTitleEnabled] = useSubSectionField<boolean>(
      index,
      subIndex,
      ["files"],
      ["subTitle", "enabled"],
    )

    const [thumbnailImage] = useSubSectionField<string>(index, subIndex, ["files"], ["thumbnail"])

    const [fileSrc, setFileSrc] = useSubSectionField<string>(
      index,
      subIndex,
      ["files"],
      ["fileSrc"],
    )

    const handleDelete = useCallback(() => {
      onDelete(subIndex)
    }, [onDelete, subIndex])

    const handlePdfFileUrlChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileSrc(e?.target?.value)
      },
      [setFileSrc],
    )

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={handleDelete}>
        <FieldGroup>
          <FieldSet className="items-center gap-3 @lg/editor-sub-sort:flex-row @lg/editor-sub-sort:gap-4">
            <Input
              value={fileSrc}
              placeholder="Enter PDF link here"
              onChange={handlePdfFileUrlChange}
            />
            <span className="font-medium text-sm text-muted-foreground">OR</span>
            <Button variant="green-outline" className="@lg/editor-sub-sort:w-fit w-full">
              <Upload />
              Upload PDF File
            </Button>
          </FieldSet>

          <FieldSet className="@sm/editor-sub-sort:flex-row">
            <Field className="w-fit">
              <FieldLabel>PDF Thumbnail</FieldLabel>
              <EditorImageUploader src={thumbnailImage} />
            </Field>
            <FieldSet className="gap-3 w-full">
              <ToggleField
                value={title}
                label="Title"
                variant="default"
                enabled={titleEnabled}
                onValueChange={setTitle}
                onEnabledChange={setTitleEnabled}
              />

              <ToggleField
                value={subTitle}
                variant="default"
                label="Sub Title"
                enabled={subTitleEnabled}
                onValueChange={setSubTitle}
                onEnabledChange={setSubTitleEnabled}
              />
            </FieldSet>
          </FieldSet>
        </FieldGroup>
      </SortableSubListItem>
    )
  },
)
