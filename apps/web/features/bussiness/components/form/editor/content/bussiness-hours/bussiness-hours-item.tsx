import { Checkbox } from "@app/ui/components/checkbox"
import { Field, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo, useCallback } from "react"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface BussinessHoursItemProps {
  itemId: string
  index: number
  subIndex: number
  onDelete: (index: number) => void
}

export const BussinessHoursItem = memo(
  ({ itemId, index, subIndex, onDelete }: BussinessHoursItemProps) => {
    const [label, setLabel] = useSubSectionField<string>(
      index,
      subIndex,
      ["timing", "periods"],
      ["label"],
    )

    const handleDelete = useCallback(() => {
      onDelete(subIndex)
    }, [onDelete, subIndex])

    const handleLabelChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setLabel(e?.target?.value)
      },
      [setLabel],
    )

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={handleDelete}>
        <FieldSet>
          <Field orientation="horizontal">
            <Checkbox checked className="size-4.5" />
            <Input value={label} onChange={handleLabelChange} />
          </Field>
          {/* <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input value={name} onChange={handleNameChange} />
            </Field>
            <ToggleField
              variant="default"
              value={designation}
              enabled={designationEnabled}
              label="Designation & Company"
              onValueChange={handleDesignationChange}
              onEnabledChange={setDesignationEnabled}
            />
          </div>

          <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
            <ImageToggleField
              label="Profile"
              imageSrc={profileImage}
              enabled={profileEnabled}
              onEnabledChange={setProfileEnabled}
            />

            <Field>
              <FieldLabel>Testimonial Text</FieldLabel>
              <Textarea
                className="h-full"
                value={testimonialText}
                onChange={handleTextimonialTextChange}
              />
            </Field>
          </div> */}
        </FieldSet>
      </SortableSubListItem>
    )
  },
)
