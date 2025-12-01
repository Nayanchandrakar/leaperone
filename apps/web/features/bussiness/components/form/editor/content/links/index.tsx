import { FieldGroup } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { useMemo } from "react"
import { ToggleTextField } from "@/components/form/toggle-text-field"
import { ToggleTextareaField } from "@/components/form/toogle-textarea-field"
import { withForm } from "@/components/ui/app-form"
import { RenderLinksForm } from "@/features/bussiness/components/form/editor/content/links/render-links-form"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface SocialLinksFormProps {
  index: number
  sectionId: string
}

export const SocialLinksForm = withForm({
  props: {} as SocialLinksFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionId, index }) => {
    const sectionName = useMemo(() => `sections[${index}]` as const, [index])

    return (
      <form.AppField
        name={`${sectionName}.enabled`}
        children={(sectionField) => (
          <EditorSortItem
            id={sectionId}
            contentClassName="p-0"
            checked={sectionField.state.value}
            name="Links: Social, Payment & more"
            onCheckedChange={sectionField.handleChange}
          >
            <FieldGroup className="p-5">
              <ToggleTextField
                form={form}
                variant="gray"
                label="Heading"
                fields={{
                  name: `${sectionName}.heading.text`,
                  enabled: `${sectionName}.heading.enabled`,
                }}
              />

              <ToggleTextareaField
                form={form}
                variant="gray"
                label="Description"
                fields={{
                  name: `${sectionName}.description.text`,
                  enabled: `${sectionName}.description.enabled`,
                }}
              />

              <RenderLinksForm form={form} sectionName={sectionName} />
            </FieldGroup>
            <EditorBlockFooter>
              <form.AppField
                name={`${sectionName}.background`}
                children={(field) => <field.SwitchField label="Section Background" />}
              />
            </EditorBlockFooter>
          </EditorSortItem>
        )}
      />
    )
  },
})
