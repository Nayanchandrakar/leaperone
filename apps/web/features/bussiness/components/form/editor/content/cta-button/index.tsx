import { FieldGroup } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { useMemo } from "react"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface CtaButtonFormProps {
  index: number
  sectionId: string
}

export const CtaButtonForm = withForm({
  props: {} as CtaButtonFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionId, index }) => {
    const sectionName = useMemo(() => `sections[${index}]` as const, [index])

    return (
      <form.AppField
        name={`${sectionName}.enabled`}
        children={(sectionField) => (
          <EditorSortItem
            name="Button"
            id={sectionId}
            contentClassName="p-0"
            checked={sectionField.state.value}
            onCheckedChange={sectionField.handleChange}
          >
            <FieldGroup className="p-5">
              <ToggleTextField
                form={form}
                variant="gray"
                label="Heading"
                fields={{
                  name: `${sectionName}.heading.text`,
                  enabled: `${sectionName}.heading.enabled`,
                }}
              />

              <ToggleTextareaField
                form={form}
                variant="gray"
                label="Description"
                fields={{
                  name: `${sectionName}.description.text`,
                  enabled: `${sectionName}.description.enabled`,
                }}
              />

              <div className="grid @lg/editor-block-content:grid-cols-2 gap-3">
                <form.AppField
                  name={`${sectionName}.label`}
                  children={(field) => (
                    <field.TextField
                      variant="gray"
                      label="Button Label"
                      placeholder="Enter button label here"
                    />
                  )}
                />

                <form.AppField
                  name={`${sectionName}.link`}
                  children={(field) => (
                    <field.TextField
                      variant="gray"
                      label="Button Link"
                      placeholder="Enter button link here"
                    />
                  )}
                />
              </div>
            </FieldGroup>
            <EditorBlockFooter>
              <form.AppField
                name={`${sectionName}.background`}
                children={(field) => <field.SwitchField label="Section Background" />}
              />
            </EditorBlockFooter>
          </EditorSortItem>
        )}
      />
    )
  },
})
