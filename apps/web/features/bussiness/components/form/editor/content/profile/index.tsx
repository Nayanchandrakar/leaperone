import { FieldGroup, FieldSeparator } from "@app/ui/components/field"
import type { ContentEditorSchema } from "@app/zod/types"
import { withForm } from "@/components/ui/app-form"
import { AddMoreContactIconsForm } from "@/features/bussiness/components/form/editor/content/profile/add-more-contact-icons-form"
import { ProfileContactsForm } from "@/features/bussiness/components/form/editor/content/profile/profile-contacts-form"
import { ProfileImagesForm } from "@/features/bussiness/components/form/editor/content/profile/profile-images-form"
import { ProfileInfoForm } from "@/features/bussiness/components/form/editor/content/profile/profile-info-form"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"

interface FormProps {
  sectionIdx: number
  id: string
}

export const ProfileForm = withForm({
  props: {} as FormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx, id }) => {
    return (
      <form.AppField
        name={`sections[${sectionIdx}].enabled`}
        children={(sectionField) => (
          <EditorSortItem
            id={id}
            name="Card Profile"
            checked={sectionField.state.value}
            onCheckedChange={sectionField.handleChange}
          >
            <FieldGroup>
              <ProfileImagesForm form={form} sectionIdx={sectionIdx} />
              <ProfileInfoForm form={form} sectionIdx={sectionIdx} />
              <FieldSeparator />
              <form.AppField
                name={`sections[${sectionIdx}].contacts.enabled`}
                children={(field) => <field.SwitchField label="Quick Contact links with Icons" />}
              />
              <ProfileContactsForm form={form} sectionIdx={sectionIdx} />
              <AddMoreContactIconsForm form={form} sectionIdx={sectionIdx} />
            </FieldGroup>
          </EditorSortItem>
        )}
      />
    )
  },
})
