import type { ContentEditorSchema } from "@app/zod/types"
import { useCallback } from "react"
import { withForm } from "@/components/ui/app-form"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import {
  EditorSortGroup,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"

interface ProfileContactsFormProps {
  sectionIdx: number
}

export const ProfileContactsForm = withForm({
  props: {} as ProfileContactsFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    const handleContactChange = useCallback(
      (contactIdx: number) => {
        form.setFieldValue(`sections[${sectionIdx}].contacts.list[${contactIdx}].value`, "")
      },
      [form, sectionIdx],
    )

    return (
      <form.AppField
        mode="array"
        name={`sections[${sectionIdx}].contacts.list`}
        children={(field) => (
          <EditorSortProvider data={field.state.value} onDataChange={field.moveValue}>
            <EditorSortGroup>
              {(contact, contactIdx) => (
                <EditorSubSortItem
                  id={contact.id}
                  key={contactIdx}
                  onDelete={() => {
                    field.removeValue(contactIdx, {
                      dontValidate: true,
                    })
                  }}
                >
                  <EditorSubSortTwoColumnGrid>
                    <form.AppField
                      listeners={{
                        onChange: () => handleContactChange(contactIdx),
                      }}
                      name={`sections[${sectionIdx}].contacts.list[${contactIdx}].type`}
                      children={(field) => <field.SelectField options={CONTACT_OPTIONS} />}
                    />
                    <form.AppField
                      name={`sections[${sectionIdx}].contacts.list[${contactIdx}].value`}
                      children={(field) => <field.TextField />}
                    />
                  </EditorSubSortTwoColumnGrid>
                </EditorSubSortItem>
              )}
            </EditorSortGroup>
          </EditorSortProvider>
        )}
      />
    )
  },
})
