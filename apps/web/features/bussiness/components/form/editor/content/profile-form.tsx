import { FieldGroup, FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema, ProfileCardSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { withForm } from "@/components/ui/app-form"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface FormProps {
  item: ProfileCardSchema
  index: number
}

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
        </FieldGroup>
      </EditorSortItem>
    )
  },
})
