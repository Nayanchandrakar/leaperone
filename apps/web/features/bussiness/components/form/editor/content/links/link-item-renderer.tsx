import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo, useCallback } from "react"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface LinkItemRendererProps {
  index: number
  itemId: string
  subIndex: number
  onDelete: (index: number) => void
}

export const LinkItemRenderer = memo(
  ({ itemId, index, subIndex, onDelete }: LinkItemRendererProps) => {
    const [label, setLabel] = useSubSectionField<string>(index, subIndex, ["links"], ["label"])
    const [url, setUrl] = useSubSectionField<string>(index, subIndex, ["links"], ["url"])

    const handleDelete = useCallback(() => {
      onDelete(subIndex)
    }, [onDelete, subIndex])

    const handleLabelChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(e?.target?.value)
      },
      [setLabel],
    )

    const handleUrlChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e?.target?.value)
      },
      [setUrl],
    )

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={handleDelete}>
        <EditorSubSortTwoColumnGrid>
          <Field>
            <FieldLabel>Link Label</FieldLabel>
            <Input value={label} onChange={handleLabelChange} />
          </Field>
          <Field>
            <FieldLabel>Profile Link</FieldLabel>
            <Input value={url} onChange={handleUrlChange} />
          </Field>
        </EditorSubSortTwoColumnGrid>
      </SortableSubListItem>
    )
  },
)

LinkItemRenderer.displayName = "LinkItemRenderer"
