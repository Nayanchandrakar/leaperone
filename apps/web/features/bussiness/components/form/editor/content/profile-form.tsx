import { FieldGroup, FieldSeparator, FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema, ProfileCardSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { withForm } from "@/components/ui/app-form"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"
import {
  EditorSortGroup,
  EditorSortItem,
  EditorSortProvider,
  EditorSubSortItem,
} from "@/features/bussiness/components/ui/editor-sort"

interface FormProps {
  item: ProfileCardSchema
  index: number
}

const QUICK_FIELDS = [
  {
    label: "Phone Number",
    value: "phone",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Website",
    value: "website",
  },
]

export const ProfileForm = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, item, index }) => {
    return (
      <EditorSortItem
        id={item.id}
        name="Card Profile"
        checked={item.enabled}
        onCheckedChange={(checked) => {
          form.setFieldValue(`sections[${index}].enabled`, checked)
        }}
      >
        <FieldGroup>
          <FieldSet>
            <ToggleTextField
              form={form}
              variant="gray"
              toogleLabel="Name"
              fields={{
                name: `sections[${index}].nameSection.name`,
                enabled: `sections[${index}].nameSection.enabled`,
              }}
            />
            <div className="grid @lg/editor-block-content:grid-cols-2 gap-4">
              <ToggleTextField
                form={form}
                variant="gray"
                toogleLabel="Info Line 1"
                fields={{
                  name: `sections[${index}].infoSection.primaryInfo.text`,
                  enabled: `sections[${index}].infoSection.primaryInfo.enabled`,
                }}
              />
              <ToggleTextField
                form={form}
                variant="gray"
                toogleLabel="Info Line 2"
                fields={{
                  name: `sections[${index}].infoSection.secondaryInfo.text`,
                  enabled: `sections[${index}].infoSection.secondaryInfo.enabled`,
                }}
              />
            </div>
          </FieldSet>

          <FieldSeparator />

          <FieldSet>
            <FieldGroup>
              <form.AppField
                name={`sections[${index}].quickContact.enabled`}
                children={(field) => {
                  return <field.SwitchField label="Quick Contact links with Icons" />
                }}
              />
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup className="gap-7 sm:gap-8">
              <form.AppField
                name={`sections[${index}].quickContact.contacts`}
                children={(field) => (
                  <EditorSortProvider data={field?.state?.value} onDataChange={field.handleChange}>
                    <EditorSortGroup>
                      {(subItem, subIndex) => (
                        <EditorSubSortItem id={subItem.id} key={subIndex} onDelete={() => {}}>
                          <EditorSubSortTwoColumnGrid>
                            <form.AppField
                              name={`sections[${index}].quickContact.contacts[${subIndex}].type`}
                              children={(field) => <field.SelectField options={QUICK_FIELDS} />}
                            />
                            <form.AppField
                              name={`sections[${index}].quickContact.contacts[${subIndex}].value`}
                              children={(field) => <field.TextField />}
                            />
                          </EditorSubSortTwoColumnGrid>
                        </EditorSubSortItem>
                      )}
                    </EditorSortGroup>
                  </EditorSortProvider>
                )}
              />
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </EditorSortItem>
    )
  },
})
