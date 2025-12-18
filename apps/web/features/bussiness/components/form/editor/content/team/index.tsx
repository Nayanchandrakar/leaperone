import type { TeamSection } from "@app/core/types"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { AddTeamMemberForm } from "@/features/bussiness/components/form/editor/content/team/add-team-member"
import { TeamMembersList } from "@/features/bussiness/components/form/editor/content/team/team-members-list"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const TeamSectionForm = memo(({ index }: ContentSectionProps) => {
  const { team, updateSectionField } = useContentEditorStore(
    useShallow((state) => ({
      team: state?.sections?.[index] as TeamSection,
      updateSectionField: state.updateSectionField,
    })),
  )

  return (
    <SortableListItem
      itemTitle="Team"
      itemId={team?.id}
      isEnabled={team?.enabled}
      onIsEnabledChange={(value) => updateSectionField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <Field>
          <ToogleLabel
            label="Heading"
            isActive={team?.heading?.enabled}
            onToggle={(value) => updateSectionField(index, ["heading", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={team?.heading?.text}
            onChange={(e) => updateSectionField(index, ["heading", "text"], e?.target?.value ?? "")}
          />
        </Field>
        <Field>
          <ToogleLabel
            label="Description"
            isActive={team?.description?.enabled}
            onToggle={(value) => updateSectionField(index, ["description", "enabled"], value)}
          />
          <Textarea
            variant="gray"
            value={team?.description?.text}
            onChange={(e) => {
              updateSectionField(index, ["description", "text"], e?.target?.value ?? "")
            }}
          />
        </Field>
        <TeamMembersList index={index} />
        <AddTeamMemberForm index={index} />
      </FieldGroup>
      <EditorBlockFooter>
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Section Background</FieldLabel>
          <Switch
            checked={team?.background}
            onCheckedChange={(value) => updateSectionField(index, ["background"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
})
