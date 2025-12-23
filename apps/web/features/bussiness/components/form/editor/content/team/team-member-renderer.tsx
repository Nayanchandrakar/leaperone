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
      ["memberName"],
    )
    const [memberDesignation, setMemberDesignation] = useSubSectionField<string>(
      index,
      subIndex,
      ["members"],
      ["memberDesignation"],
    )

    const [profileEnabled, setProfileEnabled] = useSubSectionField<boolean>(
      index,
      subIndex,
      ["members"],
      ["memberProfile", "enabled"],
    )
    const [profileImage] = useSubSectionField<string>(
      index,
      subIndex,
      ["members"],
      ["memberProfile", "imageSrc"],
    )

    const [descEnabled, setDescEnabled] = useSubSectionField<boolean>(
      index,
      subIndex,
      ["members"],
      ["memberDescription", "enabled"],
    )
    const [descText, setDescText] = useSubSectionField<string>(
      index,
      subIndex,
      ["members"],
      ["memberDescription", "text"],
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

    const handleMemberDesignationChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setMemberDesignation(e?.target?.value)
      },
      [setMemberDesignation],
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
              <Input value={memberDesignation} onChange={handleMemberDesignationChange} />
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
              label="Description"
              enabled={descEnabled}
              fieldClassName="h-full"
              onValueChange={setDescText}
              onEnabledChange={setDescEnabled}
            />
          </div>
        </FieldSet>
      </SortableSubListItem>
    )
  },
)

TeamMemberRenderer.displayName = "TeamMemberRenderer"
