import { Field } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { memo, useCallback } from "react"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"
import type { ContactOptionType } from "@/features/bussiness/types"

interface QuickContactItemRendererProps {
  index: number
  itemId: string
  subIndex: number
  onDelete: (index: number) => void
}

export const QuickContactItemRenderer = memo(
  ({ itemId, index, subIndex, onDelete }: QuickContactItemRendererProps) => {
    const [type, setType] = useSubSectionField<ContactOptionType>(
      index,
      subIndex,
      ["contacts", "list"],
      ["type"],
    )
    const [value, setValue] = useSubSectionField<string>(
      index,
      subIndex,
      ["contacts", "list"],
      ["value"],
    )

    const handleDelete = useCallback(() => {
      onDelete(subIndex)
    }, [onDelete, subIndex])

    const handleValueChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e?.target?.value)
      },
      [setValue],
    )

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={handleDelete}>
        <EditorSubSortTwoColumnGrid>
          <Field>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_OPTIONS.map((option) => (
                  <SelectItem key={option?.value} value={option?.value}>
                    {option?.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Input value={value} onChange={handleValueChange} />
        </EditorSubSortTwoColumnGrid>
      </SortableSubListItem>
    )
  },
)

QuickContactItemRenderer.displayName = "QuickContactItemRenderer"
