import { FieldGroup, FieldSet } from "@app/ui/components/field"
import type { DesignEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"

export const CardSettingsForm = withForm({
  props: {},
  defaultValues: {} as DesignEditorSchema,
  render: function Render({ form }) {
    return (
      <EditorBlockItem value="card-settings-form">
        <EditorBlockHeader>
          <EditorBlockTitle>Card Settings</EditorBlockTitle>
          <EditorBlockTrigger />
        </EditorBlockHeader>
        <EditorBlockContent>
          <FieldGroup>
            <FieldSet>
              <form.AppField
                name="settings.branding"
                children={(field) => (
                  <field.SwitchField label="Show Leaper One branding in your card" />
                )}
              />
            </FieldSet>
          </FieldGroup>
        </EditorBlockContent>
      </EditorBlockItem>
    )
  },
})
