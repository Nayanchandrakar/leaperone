import { FieldGroup } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { AddTeamMemberForm } from "@/features/bussiness/components/form/editor/content/team/add-team-member"
import { TeamMembersList } from "@/features/bussiness/components/form/editor/content/team/team-members-list"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface TeamSectionFormProps {
  sectionIdx: number
  id: string
}

export const TeamSectionForm = withForm({
  props: {} as TeamSectionFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx, id }) => (
    <form.AppField
      name={`sections[${sectionIdx}].enabled`}
      children={(enabledField) => (
        <EditorSortItem
          id={id}
          contentClassName="p-0"
          name="Team"
          checked={enabledField.state.value}
          onCheckedChange={enabledField.handleChange}
        >
          <FieldGroup className="p-5">
            <ToggleTextField
              form={form}
              variant="gray"
              label="Heading"
              fields={{
                name: `sections[${sectionIdx}].heading.text`,
                enabled: `sections[${sectionIdx}].heading.enabled`,
              }}
            />

            <ToggleTextareaField
              form={form}
              variant="gray"
              label="Description"
              fields={{
                name: `sections[${sectionIdx}].description.text`,
                enabled: `sections[${sectionIdx}].description.enabled`,
              }}
            />

            <TeamMembersList form={form} sectionIdx={sectionIdx} />
            <AddTeamMemberForm form={form} sectionIdx={sectionIdx} />
          </FieldGroup>
          <EditorBlockFooter>
            <form.AppField
              name={`sections[${sectionIdx}].background`}
              children={(backgroundField) => (
                <backgroundField.SwitchField label="Section Background" />
              )}
            />
          </EditorBlockFooter>
        </EditorSortItem>
      )}
    />
  ),
})
