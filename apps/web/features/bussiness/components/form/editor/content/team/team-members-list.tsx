import type { TeamSection } from "@app/core/types"
import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { useCallback } from "react"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import { SortableList, SortableSubListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface TeamMembersListProps {
  index: number
}

export function TeamMembersList({ index }: TeamMembersListProps) {
  const section = useContentEditorStore((state) => state.sections[index] as TeamSection)
  const updateItem = useContentEditorStore((state) => state.updateItem)
  const removeItem = useContentEditorStore((state) => state.removeItem)
  const moveItem = useContentEditorStore((state) => state.moveItem)

  const handleDataChange = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveItem(index, ["members"], oldIndex, newIndex)
    },
    [index, moveItem],
  )

  const handleMemberNameChange = useCallback(
    (memberIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "team") {
        const currentMember = section.members[memberIdx]
        updateItem(index, ["members"], memberIdx, {
          ...currentMember,
          memberName: e.target.value,
        })
      }
    },
    [section, index, updateItem],
  )

  const handleDesignationChange = useCallback(
    (memberIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "team") {
        const currentMember = section.members[memberIdx]
        updateItem(index, ["members"], memberIdx, {
          ...currentMember,
          memberDesignation: e.target.value,
        })
      }
    },
    [section, index, updateItem],
  )

  const handleProfileEnabledChange = useCallback(
    (memberIdx: number, checked: boolean) => {
      if (section.type === "team") {
        const currentMember = section.members[memberIdx]
        updateItem(index, ["members"], memberIdx, {
          ...currentMember,
          memberProfile: {
            ...currentMember.memberProfile,
            enabled: checked,
          },
        })
      }
    },
    [section, index, updateItem],
  )

  const handleDescriptionTextChange = useCallback(
    (memberIdx: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (section.type === "team") {
        const currentMember = section.members[memberIdx]
        updateItem(index, ["members"], memberIdx, {
          ...currentMember,
          memberDescription: {
            ...currentMember.memberDescription,
            text: e.target.value,
          },
        })
      }
    },
    [section, index, updateItem],
  )

  const handleDescriptionEnabledToggle = useCallback(
    (memberIdx: number) => {
      if (section.type === "team") {
        const currentMember = section.members[memberIdx]
        updateItem(index, ["members"], memberIdx, {
          ...currentMember,
          memberDescription: {
            ...currentMember.memberDescription,
            enabled: !currentMember.memberDescription.enabled,
          },
        })
      }
    },
    [section, index, updateItem],
  )

  const handleDelete = useCallback(
    (memberIdx: number) => {
      removeItem(index, ["members"], memberIdx)
    },
    [index, removeItem],
  )

  if (section.type !== "team") return null
  const hasMembers = section.members?.length > 0
  if (!hasMembers) return null

  return (
    <SortableList
      items={section.members}
      onOrderChange={handleDataChange}
      renderItem={(member: any, memberIdx: number) => (
        <SortableSubListItem
          key={member.id}
          itemId={member.id}
          onItemDelete={() => handleDelete(memberIdx)}
        >
          <FieldSet>
            <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  value={member.memberName}
                  onChange={(e) => handleMemberNameChange(memberIdx, e)}
                />
              </Field>
              <Field>
                <FieldLabel>Designation</FieldLabel>
                <Input
                  value={member.memberDesignation}
                  onChange={(e) => handleDesignationChange(memberIdx, e)}
                />
              </Field>
            </div>

            <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
              <Field className="w-fit">
                <Field orientation="horizontal" className="w-fit">
                  <FieldLabel>Profile</FieldLabel>
                  <Switch
                    checked={member.memberProfile.enabled}
                    onCheckedChange={(value) => {
                      handleProfileEnabledChange(memberIdx, value)
                    }}
                  />
                </Field>
                <EditorImageUploader src={member.memberProfile.imageSrc} />
              </Field>

              <Field>
                <ToogleLabel
                  label="Description"
                  isActive={member.memberDescription.enabled}
                  onToggle={() => handleDescriptionEnabledToggle(memberIdx)}
                />
                <Textarea
                  className="h-full"
                  value={member.memberDescription.text}
                  onChange={(e) => handleDescriptionTextChange(memberIdx, e)}
                />
              </Field>
            </div>
          </FieldSet>
        </SortableSubListItem>
      )}
    />
  )
}
