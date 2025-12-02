import { FieldSet } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { withForm } from "@/components/ui/app-form"

interface ProfileInfoFormProps {
  sectionIdx: number
}

export const ProfileInfoForm = withForm({
  props: {} as ProfileInfoFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    return (
      <FieldSet>
        <ToggleTextField
          form={form}
          variant="gray"
          label="Name"
          fields={{
            name: `sections[${sectionIdx}].name.name`,
            enabled: `sections[${sectionIdx}].name.enabled`,
          }}
        />
        <div className="grid @lg/editor-block-content:grid-cols-2 gap-3">
          <ToggleTextField
            form={form}
            variant="gray"
            label="Info Line 1"
            fields={{
              name: `sections[${sectionIdx}].info.primary.text`,
              enabled: `sections[${sectionIdx}].info.primary.enabled`,
            }}
          />
          <ToggleTextField
            form={form}
            variant="gray"
            label="Info Line 2"
            fields={{
              name: `sections[${sectionIdx}].info.secondary.text`,
              enabled: `sections[${sectionIdx}].info.secondary.enabled`,
            }}
          />
        </div>
      </FieldSet>
    )
  },
})
