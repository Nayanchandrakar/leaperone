import { FieldGroup, FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema, HeadingTextSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

type FormProps = {
  item: HeadingTextSchema
  index: number
}

export const HeadingTextForm = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, item, index }) => {
    return (
      <EditorSortItem
        id={item.id}
        name="Heading + Text"
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
              toogleLabel="Heading"
              fields={{
                name: `sections[${index}].heading.text`,
                enabled: `sections[${index}].heading.enabled`,
              }}
            />

            <ToggleTextareaField
              form={form}
              variant="gray"
              toogleLabel="Description"
              fields={{
                name: `sections[${index}].description.text`,
                enabled: `sections[${index}].description.enabled`,
              }}
            />
          </FieldSet>
        </FieldGroup>
      </EditorSortItem>
    )
  },
})
