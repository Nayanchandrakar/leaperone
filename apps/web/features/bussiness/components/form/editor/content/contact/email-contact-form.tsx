import type { ContentEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { EditorSubSortTwoColumnGrid } from "@/features/bussiness/components/ui/editor-form-layout"

interface EmailContactFormProps {
  contactIdx: number
  sectionIdx: number
}

export const EmailContactForm = withForm({
  props: {} as EmailContactFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, contactIdx, sectionIdx }) => (
    <EditorSubSortTwoColumnGrid>
      <form.AppField
        name={`sections[${sectionIdx}].items[${contactIdx}].label`}
        children={(field) => <field.TextField label="Label" />}
      />

      <form.AppField
        name={`sections[${sectionIdx}].items[${contactIdx}].url`}
        children={(field) => <field.TextField label="Email" />}
      />
    </EditorSubSortTwoColumnGrid>
  ),
})
