import { FieldGroup } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { withForm } from "@/components/ui/app-form"
import { AddContactItemButtonForm } from "@/features/bussiness/components/form/editor/content/contact/add-more-contact-form"
import { ContactItemsList } from "@/features/bussiness/components/form/editor/content/contact/contact-items-list"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface ContactDetailsFormProps {
  sectionIdx: number
  id: string
}

export const ContactDetailsForm = withForm({
  props: {} as ContactDetailsFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, id, sectionIdx }) => {
    return (
      <form.AppField
        name={`sections[${sectionIdx}].enabled`}
        children={(sectionField) => (
          <EditorSortItem
            id={id}
            name="Contact Details"
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
                  name: `sections[${sectionIdx}].heading.text`,
                  enabled: `sections[${sectionIdx}].heading.enabled`,
                }}
              />
              <ContactItemsList form={form} sectionIdx={sectionIdx} />
              <AddContactItemButtonForm form={form} sectionIdx={sectionIdx} />
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
    )
  },
})
