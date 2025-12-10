import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useCallback } from "react"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface TeamMembersListProps {
  sectionIdx: number
}

export function TeamMembersList({ sectionIdx }: TeamMembersListProps) {
  const section = useContentSection(sectionIdx)
  const updateItem = useContentEditorStore((state) => state.updateItem)
  const removeItem = useContentEditorStore((state) => state.removeItem)
  const moveItem = useContentEditorStore((state) => state.moveItem)

  const handleDataChange = useCallback(
    (oldIndex: number, newIndex: number) => {
      moveItem(sectionIdx, ["members"], oldIndex, newIndex)
    },
    [sectionIdx, moveItem],
  )

  const handleMemberNameChange = useCallback(
    (memberIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "team") {
        const currentMember = section.members[memberIdx]
        updateItem(sectionIdx, ["members"], memberIdx, {
          ...currentMember,
          memberName: e.target.value,
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleDesignationChange = useCallback(
    (memberIdx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (section.type === "team") {
        const currentMember = section.members[memberIdx]
        updateItem(sectionIdx, ["members"], memberIdx, {
          ...currentMember,
          memberDesignation: e.target.value,
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleProfileEnabledChange = useCallback(
    (memberIdx: number, checked: boolean) => {
      if (section.type === "team") {
        const currentMember = section.members[memberIdx]
        updateItem(sectionIdx, ["members"], memberIdx, {
          ...currentMember,
          memberProfile: {
            ...currentMember.memberProfile,
            enabled: checked,
          },
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleDescriptionTextChange = useCallback(
    (memberIdx: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (section.type === "team") {
        const currentMember = section.members[memberIdx]
        updateItem(sectionIdx, ["members"], memberIdx, {
          ...currentMember,
          memberDescription: {
            ...currentMember.memberDescription,
            text: e.target.value,
          },
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleDescriptionEnabledToggle = useCallback(
    (memberIdx: number) => {
      if (section.type === "team") {
        const currentMember = section.members[memberIdx]
        updateItem(sectionIdx, ["members"], memberIdx, {
          ...currentMember,
          memberDescription: {
            ...currentMember.memberDescription,
            enabled: !currentMember.memberDescription.enabled,
          },
        })
      }
    },
    [section, sectionIdx, updateItem],
  )

  const handleDelete = useCallback(
    (memberIdx: number) => {
      removeItem(sectionIdx, ["members"], memberIdx)
    },
    [sectionIdx, removeItem],
  )

  if (section.type !== "team") return null
  const hasMembers = section.members?.length > 0
  if (!hasMembers) return null

  return (
    <EditorSortProvider data={section.members} onDataChange={handleDataChange}>
      <EditorSortGroup>
        {(member: any, memberIdx: number) => (
          <EditorSubSortItem
            id={member.id}
            key={member.id}
            onDelete={() => handleDelete(memberIdx)}
          >
            <FieldSet>
              <div className="grid @lg/editor-sub-sort:grid-cols-2 gap-3">
                <Field>
                  <FieldLabel htmlFor={`team-member-${memberIdx}-name`}>Name</FieldLabel>
                  <Input
                    id={`team-member-${memberIdx}-name`}
                    value={member.memberName}
                    onChange={(e) => handleMemberNameChange(memberIdx, e)}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor={`team-member-${memberIdx}-designation`}>
                    Designation
                  </FieldLabel>
                  <Input
                    id={`team-member-${memberIdx}-designation`}
                    value={member.memberDesignation}
                    onChange={(e) => handleDesignationChange(memberIdx, e)}
                  />
                </Field>
              </div>

              <div className="flex flex-col @sm/editor-sub-sort:flex-row gap-6">
                <Field className="w-fit">
                  <FieldLabel
                    htmlFor={`team-member-${memberIdx}-profile-enabled`}
                    className="flex-row gap-2"
                  >
                    <span>Profile</span>
                    <Switch
                      id={`team-member-${memberIdx}-profile-enabled`}
                      checked={member.memberProfile.enabled}
                      onCheckedChange={(checked) => handleProfileEnabledChange(memberIdx, checked)}
                    />
                  </FieldLabel>
                  <EditorImageUploader src={member.memberProfile.imageSrc} />
                </Field>

                <Field className="h-full">
                  <FieldLabel className="flex items-center justify-between">
                    <span>Description</span>
                    <button
                      type="button"
                      onClick={() => handleDescriptionEnabledToggle(memberIdx)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {member.memberDescription.enabled ? (
                        <EyeIcon className="size-4" />
                      ) : (
                        <EyeOffIcon className="size-4" />
                      )}
                    </button>
                  </FieldLabel>
                  <Textarea
                    className="h-full"
                    value={member.memberDescription.text}
                    onChange={(e) => handleDescriptionTextChange(memberIdx, e)}
                  />
                </Field>
              </div>
            </FieldSet>
          </EditorSubSortItem>
        )}
      </EditorSortGroup>
    </EditorSortProvider>
  )
}
