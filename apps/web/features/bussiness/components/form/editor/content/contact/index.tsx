import { FieldGroup } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { useMemo } from "react"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { withForm } from "@/components/ui/app-form"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface ContactDetailsFormProps {
  index: number
  sectionId: string
}

export const ContactDetailsForm = withForm({
  props: {} as ContactDetailsFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionId, index }) => {
    const sectionName = useMemo(() => `sections[${index}]` as const, [index])

    return (
      <form.AppField
        name={`${sectionName}.enabled`}
        children={(sectionField) => (
          <EditorSortItem
            id={sectionId}
            contentClassName="p-0"
            name="Contact Details"
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
