import { Field } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"

interface ProfileImagesFormProps {
  sectionIdx: number
}

export const ProfileImagesForm = withForm({
  props: {} as ProfileImagesFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    return (
      <div className="flex gap-5 @max-[260px]/editor-block-content:flex-col">
        <Field className="w-fit">
          <form.AppField
            name={`sections[${sectionIdx}].details.profile.enabled`}
            children={(field) => <field.SwitchField label="Profile Pic" />}
          />
          <form.AppField
            name={`sections[${sectionIdx}].details.profile.imageSrc`}
            children={(field) => <EditorImageUploader src={field?.state?.value} />}
          />
        </Field>

        <Field className="w-fit">
          <form.AppField
            name={`sections[${sectionIdx}].details.branding.enabled`}
            children={(field) => <field.SwitchField label="Brand Logo" />}
          />
          <form.AppField
            name={`sections[${sectionIdx}].details.branding.imageSrc`}
            children={(field) => <EditorImageUploader src={field?.state?.value} />}
          />
        </Field>
      </div>
    )
  },
})
