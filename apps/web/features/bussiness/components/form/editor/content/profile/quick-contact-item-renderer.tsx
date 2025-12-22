import { Field } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { memo } from "react"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import { useSubSectionField } from "@/features/bussiness/hooks/use-subsection-field"
import type { ContactOptionType } from "@/features/bussiness/types"

interface QuickContactItemRendererProps {
  itemId: string
  index: number
  subIndex: number
  onDelete: () => void
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

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={onDelete}>
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
          <Input value={value} onChange={(e) => setValue(e?.target?.value)} />
        </EditorSubSortTwoColumnGrid>
      </SortableSubListItem>
    )
  },
)
