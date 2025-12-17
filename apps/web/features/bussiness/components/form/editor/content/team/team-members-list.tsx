import type { TeamSection } from "@app/core/types"
import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { useShallow } from "zustand/react/shallow"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface TeamMembersListProps {
  index: number
}

export function TeamMembersList({ index }: TeamMembersListProps) {
  const { updateSubSectionField, removeSubSectionItem, members } = useContentEditorStore(
    useShallow((state) => ({
      updateSubSectionField: state.updateSubSectionField,
      removeSubSectionItem: state.removeSubSectionItem,
      members: (state.sections[index] as TeamSection).members,
    })),
  )

  if (!members?.length) return null

  return (
    <SortableList
      items={members}
      renderItem={(member, memberIdx) => (
        <SortableSubListItem
          key={member?.id}
          itemId={member?.id}
          onItemDelete={() => removeSubSectionItem(index, memberIdx, ["members"])}
        >
          <FieldSet>
            <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  value={member?.memberName}
                  onChange={(e) => {
                    updateSubSectionField(
                      index,
                      memberIdx,
                      ["members"],
                      ["memberName"],
                      e?.target?.value ?? "",
                    )
                  }}
                />
              </Field>
              <Field>
                <FieldLabel>Designation</FieldLabel>
                <Input
                  value={member?.memberDesignation}
                  onChange={(e) => {
                    updateSubSectionField(
                      index,
                      memberIdx,
                      ["members"],
                      ["memberDesignation"],
                      e?.target?.value ?? "",
                    )
                  }}
                />
              </Field>
            </div>

            <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
              <Field className="w-fit">
                <Field orientation="horizontal" className="w-fit">
                  <FieldLabel>Profile</FieldLabel>
                  <Switch
                    checked={member?.memberProfile?.enabled}
                    onCheckedChange={(value) => {
                      updateSubSectionField(
                        index,
                        memberIdx,
                        ["members"],
                        ["memberProfile", "enabled"],
                        value,
                      )
                    }}
                  />
                </Field>
                <EditorImageUploader src={member?.memberProfile?.imageSrc} />
              </Field>

              <Field>
                <ToogleLabel
                  label="Description"
                  isActive={member?.memberDescription?.enabled}
                  onToggle={() => {
                    updateSubSectionField(
                      index,
                      memberIdx,
                      ["members"],
                      ["memberDescription", "enabled"],
                      !member?.memberDescription?.enabled,
                    )
                  }}
                />
                <Textarea
                  className="h-full"
                  value={member?.memberDescription?.text}
                  onChange={(e) => {
                    updateSubSectionField(
                      index,
                      memberIdx,
                      ["members"],
                      ["memberDescription", "text"],
                      e?.target?.value ?? "",
                    )
                  }}
                />
              </Field>
            </div>
          </FieldSet>
        </SortableSubListItem>
      )}
    />
  )
}
