import { Field, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo } from "react"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionField } from "@/features/bussiness/hooks/use-subsection-field"

interface LinkItemRendererProps {
  itemId: string
  index: number
  subIndex: number
  onDelete: () => void
}

export const LinkItemRenderer = memo(
  ({ itemId, index, subIndex, onDelete }: LinkItemRendererProps) => {
    const [label, setLabel] = useSubSectionField<string>(index, subIndex, ["links"], ["label"])
    const [url, setUrl] = useSubSectionField<string>(index, subIndex, ["links"], ["url"])

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={onDelete}>
        <EditorSubSortTwoColumnGrid>
          <Field>
            <FieldLabel>Link Label</FieldLabel>
            <Input value={label} onChange={(e) => setLabel(e.target.value)} />
          </Field>
          <Field>
            <FieldLabel>Profile Link</FieldLabel>
            <Input value={url} onChange={(e) => setUrl(e.target.value)} />
          </Field>
        </EditorSubSortTwoColumnGrid>
      </SortableSubListItem>
    )
  },
)
