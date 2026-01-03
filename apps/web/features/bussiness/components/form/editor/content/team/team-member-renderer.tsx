import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo, useCallback } from "react"
import { ImageToggleField } from "@/features/bussiness/components/fields/image-toggle-field"
import { ToggleTextareaField } from "@/features/bussiness/components/fields/toggle-textarea-field"
import { SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSubSectionField } from "@/features/bussiness/hooks/home/use-subsection-field"

interface TeamMemberRendererProps {
  index: number
  itemId: string
  subIndex: number
  onDelete: (index: number) => void
}

export const TeamMemberRenderer = memo(
  ({ itemId, index, subIndex, onDelete }: TeamMemberRendererProps) => {
    const [memberName, setMemberName] = useSubSectionField<string>(
      index,
      subIndex,
      ["members"],
      ["name"],
    )
    const [designation, setDesignation] = useSubSectionField<string>(
      index,
      subIndex,
      ["members"],
      ["designation"],
    )

    const [profileEnabled, setProfileEnabled] = useSubSectionField<boolean>(
      index,
      subIndex,
      ["members"],
      ["profile", "enabled"],
    )
    const [profileImage] = useSubSectionField<string>(
      index,
      subIndex,
      ["members"],
      ["profile", "imageSrc"],
    )

    const [descEnabled, setDescEnabled] = useSubSectionField<boolean>(
      index,
      subIndex,
      ["members"],
      ["description", "enabled"],
    )
    const [descText, setDescText] = useSubSectionField<string>(
      index,
      subIndex,
      ["members"],
      ["description", "text"],
    )

    const handleDelete = useCallback(() => {
      onDelete(subIndex)
    }, [onDelete, subIndex])

    const handleMemberNameChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setMemberName(e?.target?.value)
      },
      [setMemberName],
    )

    const handledesignationChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesignation(e?.target?.value)
      },
      [setDesignation],
    )

    return (
      <SortableSubListItem itemId={itemId} onItemDelete={handleDelete}>
        <FieldSet>
          <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input value={memberName} onChange={handleMemberNameChange} />
            </Field>
            <Field>
              <FieldLabel>Designation</FieldLabel>
              <Input value={designation} onChange={handledesignationChange} />
            </Field>
          </div>
          <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
            <ImageToggleField
              label="Profile"
              imageSrc={profileImage}
              enabled={profileEnabled}
              onEnabledChange={setProfileEnabled}
            />
            <ToggleTextareaField
              value={descText}
              className="h-full"
              label="Description"
              enabled={descEnabled}
              onValueChange={setDescText}
              onEnabledChange={setDescEnabled}
            />
          </div>
        </FieldSet>
      </SortableSubListItem>
    )
  },
)
