import { FieldGroup, FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface FormProps {
  id: string
  sectionIdx: number
}

export const HeadingTextForm = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, id, sectionIdx }) => {
    return (
      <form.AppField
        name={`sections[${sectionIdx}].enabled`}
        children={(sectionField) => (
          <EditorSortItem
            id={id}
            name="Heading + Text"
            contentClassName="p-0"
            checked={sectionField.state.value}
            onCheckedChange={sectionField.handleChange}
          >
            <FieldGroup className="p-5">
              <FieldSet>
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
              </FieldSet>
            </FieldGroup>

            <EditorBlockFooter>
              <form.AppField
                name={`sections[${sectionIdx}].background`}
                children={(field) => <field.SwitchField label="Section Background" />}
              />
            </EditorBlockFooter>
          </EditorSortItem>
        )}
      />
    )
  },
})
