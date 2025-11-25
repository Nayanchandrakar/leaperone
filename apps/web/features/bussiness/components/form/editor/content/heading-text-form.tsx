import { FieldGroup, FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema, HeadingTextSchema } from "@app/zod/types"
import { useCallback } from "react"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"
import { EditorBlockFooter } from "../../../ui/editor-block"

type FormProps = {
  item: HeadingTextSchema
  index: number
}

export const HeadingTextForm = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, item, index }) => {
    const handleEnabledChange = useCallback(
      (checked: boolean) => {
        form.setFieldValue(`sections[${index}].enabled`, checked)
      },
      [form, index],
    )

    return (
      <EditorSortItem
        id={item.id}
        name="Heading + Text"
        checked={item.enabled}
        contentClassName="p-0"
        onCheckedChange={handleEnabledChange}
      >
        <FieldGroup className="p-5">
          <FieldSet>
            <ToggleTextField
              form={form}
              variant="gray"
              label="Heading"
              fields={{
                name: `sections[${index}].heading.text`,
                enabled: `sections[${index}].heading.enabled`,
              }}
            />

            <ToggleTextareaField
              form={form}
              variant="gray"
              label="Description"
              fields={{
                name: `sections[${index}].description.text`,
                enabled: `sections[${index}].description.enabled`,
              }}
            />
          </FieldSet>
        </FieldGroup>

        <EditorBlockFooter>
          <form.AppField
            name={`sections[${index}].background`}
            children={(field) => <field.SwitchField label="Section Background" />}
          />
        </EditorBlockFooter>
      </EditorSortItem>
    )
  },
})
