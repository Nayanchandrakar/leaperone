import { FieldGroup } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { withForm } from "@/components/ui/app-form"
import { ContactItemsList } from "@/features/bussiness/components/form/editor/content/contact/contact-items-list"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface ContactDetailsFormProps {
  index: number
  sectionId: string
}

export const ContactDetailsForm = withForm({
  props: {} as ContactDetailsFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionId, index }) => (
    <form.AppField
      name={`sections[${index}].enabled`}
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
                name: `sections[${index}].heading.text`,
                enabled: `sections[${index}].heading.enabled`,
              }}
            />

            <ContactItemsList form={form} sectionIdx={index} />
          </FieldGroup>
          <EditorBlockFooter>
            <form.AppField
              name={`sections[${index}].background`}
              children={(field) => <field.SwitchField label="Section Background" />}
            />
          </EditorBlockFooter>
        </EditorSortItem>
      )}
    />
  ),
})
