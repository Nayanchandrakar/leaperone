import { Button } from "@app/ui/components/button"
import { Field, FieldGroup, FieldSeparator, FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema, ProfileCardSchema } from "@app/zod/types"
import { Plus } from "lucide-react"
import { useCallback, useMemo } from "react"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { withForm } from "@/components/ui/app-form"
import { DropdownSelectButton } from "@/features/bussiness/components/buttons/home/dropdown-select-button"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
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
  item: ProfileCardSchema
  index: number
}

export const ProfileForm = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, item, index }) => {
    const sectionName = useMemo(() => `sections[${index}]` as const, [index])

    const handleContactChange = useCallback(
      (contactIdx: number) => {
        form.setFieldValue(`${sectionName}.contacts.list[${contactIdx}].value`, "", {
          dontValidate: true,
          dontUpdateMeta: true,
        })
      },
      [form, sectionName],
    )

    const handleEnabledChange = useCallback(
      (checked: boolean) => {
        form.setFieldValue(`${sectionName}.enabled`, checked)
      },
      [form, sectionName],
    )

    return (
      <EditorSortItem
        id={item.id}
        name="Card Profile"
        contentClassName="p-0"
        checked={item.enabled}
        onCheckedChange={handleEnabledChange}
      >
        <FieldGroup className="p-5">
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
                children={(field) => <field.SwitchField label="Quick Contact links with Icons" />}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <form.AppField
                mode="array"
                name={`${sectionName}.contacts.list`}
                children={(field) => (
                  <EditorSortProvider data={field.state.value} onDataChange={field.handleChange}>
                    <EditorSortGroup>
                      {(contact, contactIdx) => (
                        <EditorSubSortItem
                          id={contact.id}
                          key={contact.id}
                          onDelete={() => {
                            field.removeValue(contactIdx)
                          }}
                        >
                          <EditorSubSortTwoColumnGrid>
                            <form.AppField
                              listeners={{
                                onChange: () => handleContactChange(contactIdx),
                              }}
                              name={`${sectionName}.contacts.list[${contactIdx}].type`}
                              children={(field) => <field.SelectField options={CONTACT_OPTIONS} />}
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
                )}
              />

              <form.AppField
                mode="array"
                name={`${sectionName}.contacts.list`}
                children={(field) => (
                  <Field className="w-fit">
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
                      <Button variant="green-outline">
                        <Plus />
                        Add more contact icons
                      </Button>
                    </DropdownSelectButton>
                  </Field>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </FieldGroup>

        <EditorBlockFooter>
          <form.AppField
            name={`${sectionName}.background`}
            children={(field) => <field.SwitchField label="Section Background" />}
          />
        </EditorBlockFooter>
      </EditorSortItem>
    )
  },
})
