import { Button } from "@app/ui/components/button"
import { FieldGroup, FieldSeparator, FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { Plus } from "lucide-react"
import React, { useCallback, useMemo } from "react"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { withForm } from "@/components/ui/app-form"
import { DropdownSelectButton } from "@/features/bussiness/components/buttons/home/dropdown-select-button"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import {
  EditorSortGroup,
  EditorSortItem,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import { generateUUID } from "@/utils"

interface FormProps {
  index: number
  sectionId: string
}

export const ProfileForm = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionId, index }) => {
    const sectionName = useMemo(() => `sections[${index}]` as const, [index])

    const handleContactChange = useCallback(
      (contactIdx: number) => {
        form.setFieldValue(`${sectionName}.contacts.list[${contactIdx}].value`, "")
      },
      [form, sectionName],
    )

    return (
      <form.AppField
        name={`${sectionName}.enabled`}
        children={(sectionField) => (
          <EditorSortItem
            id={sectionId}
            name="Card Profile"
            checked={sectionField.state.value}
            onCheckedChange={sectionField.handleChange}
          >
            <FieldGroup>
              <FieldSet>
                <ToggleTextField
                  form={form}
                  variant="gray"
                  label="Name"
                  fields={{
                    name: `${sectionName}.name.name`,
                    enabled: `${sectionName}.name.enabled`,
                  }}
                />
                <div className="grid @lg/editor-block-content:grid-cols-2 gap-4">
                  <ToggleTextField
                    form={form}
                    variant="gray"
                    label="Info Line 1"
                    fields={{
                      name: `${sectionName}.info.primary.text`,
                      enabled: `${sectionName}.info.primary.enabled`,
                    }}
                  />
                  <ToggleTextField
                    form={form}
                    variant="gray"
                    label="Info Line 2"
                    fields={{
                      name: `${sectionName}.info.secondary.text`,
                      enabled: `${sectionName}.info.secondary.enabled`,
                    }}
                  />
                </div>
              </FieldSet>
              <FieldSeparator />
              <FieldSet>
                <FieldGroup>
                  <form.AppField
                    name={`${sectionName}.contacts.enabled`}
                    children={(field) => (
                      <field.SwitchField label="Quick Contact links with Icons" />
                    )}
                  />
                </FieldGroup>
              </FieldSet>
              <FieldSet>
                <FieldGroup>
                  <form.AppField
                    mode="array"
                    name={`${sectionName}.contacts.list`}
                    children={(field) => (
                      <React.Fragment>
                        <EditorSortProvider data={field.state.value} onDataChange={field.moveValue}>
                          <EditorSortGroup>
                            {(contact, contactIdx) => (
                              <EditorSubSortItem
                                id={contact.id}
                                key={contact.id}
                                onDelete={() => field.removeValue(contactIdx)}
                              >
                                <EditorSubSortTwoColumnGrid>
                                  <form.AppField
                                    listeners={{
                                      onChange: () => handleContactChange(contactIdx),
                                    }}
                                    name={`${sectionName}.contacts.list[${contactIdx}].type`}
                                    children={(field) => (
                                      <field.SelectField options={CONTACT_OPTIONS} />
                                    )}
                                  />
                                  <form.AppField
                                    name={`${sectionName}.contacts.list[${contactIdx}].value`}
                                    children={(field) => <field.TextField />}
                                  />
                                </EditorSubSortTwoColumnGrid>
                              </EditorSubSortItem>
                            )}
                          </EditorSortGroup>
                        </EditorSortProvider>
                        <DropdownSelectButton
                          options={CONTACT_OPTIONS}
                          onSelect={(type) => {
                            field.pushValue({
                              type,
                              value: "",
                              id: generateUUID(),
                            })
                          }}
                        >
                          <Button className="w-fit" variant="green-outline">
                            <Plus />
                            Add more contact icons
                          </Button>
                        </DropdownSelectButton>
                      </React.Fragment>
                    )}
                  />
                </FieldGroup>
              </FieldSet>
            </FieldGroup>
          </EditorSortItem>
        )}
      />
    )
  },
})
