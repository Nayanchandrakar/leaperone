import type { ProfileCardSection } from "@app/core/types"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { AddMoreContactIconsForm } from "@/features/bussiness/components/form/editor/content/profile/add-more-contact-icons-form"
import { ProfileContactsForm } from "@/features/bussiness/components/form/editor/content/profile/profile-contacts-form"
import { ProfileImagesForm } from "@/features/bussiness/components/form/editor/content/profile/profile-images-form"
import { ProfileInfoForm } from "@/features/bussiness/components/form/editor/content/profile/profile-info-form"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface ProfileFormProps {
  index: number
}

export const ProfileForm = memo(({ index }: ProfileFormProps) => {
  const { field, updateField } = useContentEditorStore(
    useShallow((state) => ({
      updateField: state.updateSectionField,
      field: state.sections[index] as ProfileCardSection,
    })),
  )

  return (
    <SortableListItem
      itemId={field?.id}
      itemTitle="Card Profile"
      isEnabled={field?.enabled}
      onIsEnabledChange={(value) => updateField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <ProfileImagesForm index={index} />
        <ProfileInfoForm index={index} />
        <FieldSeparator />

        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Quick Contact links with Icons</FieldLabel>
          <Switch
            checked={field?.contacts.enabled}
            onCheckedChange={(value) => updateField(index, ["contacts", "enabled"], value)}
          />
        </Field>
        <ProfileContactsForm index={index} />
        <AddMoreContactIconsForm index={index} />
      </FieldGroup>
    </SortableListItem>
  )
})
