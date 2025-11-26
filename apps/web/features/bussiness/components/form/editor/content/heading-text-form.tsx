import { FieldGroup, FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface FormProps {
  index: number
  sectionId: string
}

export const HeadingTextForm = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionId, index }) => {
    return (
      <form.AppField
        name={`sections[${index}].enabled`}
        children={(sectionField) => {
          return (
            <EditorSortItem
              id={sectionId}
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
                      name: `sections[${index}].heading.text`,
                      enabled: `sections[${index}].heading.enabled`,
                    }}
                  />

                  <ToggleTextareaField
                    form={form}
                    variant="gray"
                    label="Description"
                    fields={{
                      name: `sections[${index}].description.text`,
                      enabled: `sections[${index}].description.enabled`,
                    }}
                  />
                </FieldSet>
              </FieldGroup>

              <EditorBlockFooter>
                <form.AppField
                  name={`sections[${index}].background`}
                  children={(field) => <field.SwitchField label="Section Background" />}
                />
              </EditorBlockFooter>
            </EditorSortItem>
          )
        }}
      />
    )
  },
})
