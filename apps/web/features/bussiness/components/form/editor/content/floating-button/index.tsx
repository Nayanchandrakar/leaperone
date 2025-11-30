import { FieldGroup } from "@app/ui/components/field"
import type { ContentEditorSchema, FloatingButtonSchema } from "@app/zod/types"
import { useMemo } from "react"
import { withForm } from "@/components/ui/app-form"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface FloatingCardButtonFormProps {
  index: number
  sectionId: string
}

export const FloatingCardButtonForm = withForm({
  props: {} as FloatingCardButtonFormProps,
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
            name="Floating Card-Buttons"
            checked={sectionField.state.value}
            onCheckedChange={sectionField.handleChange}
          >
            <FieldGroup className="p-5">
              <form.AppField
                name={`${sectionName}.label.enabled`}
                children={(field) => <field.SwitchField label="Add to Contact button" />}
              />

              <form.Subscribe
                selector={(state) => {
                  const formState = state.values?.sections?.[index] as FloatingButtonSchema
                  return formState?.label.enabled
                }}
                children={(enabled) =>
                  enabled && (
                    <div className="p-5 bg-muted rounded-xl border border-border">
                      <form.AppField
                        name={`${sectionName}.label.text`}
                        children={(field) => <field.TextField label="Button Text" />}
                      />
                    </div>
                  )
                }
              />
            </FieldGroup>

            <EditorBlockFooter className="flex flex-col @sm/editor-block-content:flex-row gap-3">
              <form.AppField
                name={`sections[${index}].showQrButton`}
                children={(field) => <field.SwitchField label="Card QR Button" />}
              />
              <form.AppField
                name={`sections[${index}].showShareButton`}
                children={(field) => <field.SwitchField label="Card Sharing Button" />}
              />
            </EditorBlockFooter>
          </EditorSortItem>
        )}
      />
    )
  },
})
