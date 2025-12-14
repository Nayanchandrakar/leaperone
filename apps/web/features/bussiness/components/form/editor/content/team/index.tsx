import type { TeamSection } from "@app/core/types"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { AddTeamMemberForm } from "@/features/bussiness/components/form/editor/content/team/add-team-member"
import { TeamMembersList } from "@/features/bussiness/components/form/editor/content/team/team-members-list"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface TeamSectionFormProps {
  index: number
}

export function TeamSectionForm({ index, id }: TeamSectionFormProps) {
  const section = useContentEditorStore((state) => state.sections[index] as TeamSection)
  const updateSectionField = useContentEditorStore((state) => state.updateSectionField)

  return (
    <SortableListItem
      itemTitle="Team"
      itemId={section?.id}
      isEnabled={section?.enabled}
      onIsEnabledChange={(value) => updateSectionField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <Field>
          <ToogleLabel
            label="Heading"
            isActive={section?.heading?.enabled}
            onToggle={(value) => updateSectionField(index, ["heading", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={section?.heading?.text}
            onChange={(e) => updateSectionField(index, ["heading", "text"], e?.target?.value ?? "")}
          />
        </Field>

        <Field>
          <ToogleLabel
            label="Description"
            isActive={section?.description?.enabled}
            onToggle={(value) => updateSectionField(index, ["description", "enabled"], value)}
          />
          <Textarea
            variant="gray"
            value={section?.description?.text}
            onChange={(e) =>
              updateSectionField(index, ["description", "text"], e?.target?.value ?? "")
            }
          />
        </Field>

        <TeamMembersList index={index} />
        <AddTeamMemberForm index={index} />
      </FieldGroup>
      <EditorBlockFooter>
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Section Background</FieldLabel>
          <Switch
            checked={section?.background}
            onCheckedChange={(value) => updateSectionField(index, ["background"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
}
