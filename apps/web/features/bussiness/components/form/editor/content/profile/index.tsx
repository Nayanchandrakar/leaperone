import type { ProfileCardSection } from "@app/core/types"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { AddMoreContactIconsForm } from "@/features/bussiness/components/form/editor/content/profile/add-more-contact-icons-form"
import { ProfileDetailsForm } from "@/features/bussiness/components/form/editor/content/profile/profile-details-form"
import { ProfileInfoForm } from "@/features/bussiness/components/form/editor/content/profile/profile-info-form"
import { QuickContactLinksForm } from "@/features/bussiness/components/form/editor/content/profile/quick-contact-links"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ProfileForm = memo(({ index }: ContentSectionProps) => {
  const { id, enabled, contactsEnabled, updateSectionField } = useContentEditorStore(
    useShallow((state) => ({
      updateSectionField: state.updateSectionField,
      id: state.sections[index]?.id ?? "",
      enabled: state.sections[index]?.enabled ?? false,
      contactsEnabled: (state.sections[index] as ProfileCardSection)?.contacts?.enabled,
    })),
  )

  return (
    <SortableListItem
      itemId={id}
      itemTitle="Card Profile"
      isEnabled={enabled}
      onIsEnabledChange={(value) => updateSectionField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <ProfileDetailsForm index={index} />
        <ProfileInfoForm index={index} />
        <FieldSeparator />
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Quick Contact links with Icons</FieldLabel>
          <Switch
            checked={contactsEnabled}
            onCheckedChange={(value) => {
              updateSectionField(index, ["contacts", "enabled"], value)
            }}
          />
        </Field>
        <QuickContactLinksForm index={index} />
        <AddMoreContactIconsForm index={index} />
      </FieldGroup>
    </SortableListItem>
  )
})
