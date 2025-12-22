import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { memo, useMemo } from "react"
import { AddMoreContactIconsForm } from "@/features/bussiness/components/form/editor/content/profile/add-more-contact-icons-form"
import { ProfileDetailsForm } from "@/features/bussiness/components/form/editor/content/profile/profile-details-form"
import { ProfileInfoForm } from "@/features/bussiness/components/form/editor/content/profile/profile-info-form"
import { QuickContactLinksForm } from "@/features/bussiness/components/form/editor/content/profile/quick-contact-links"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSectionField } from "@/features/bussiness/hooks/use-section-field"
import {
  selectSectionId,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ProfileForm = memo(({ index }: ContentSectionProps) => {
  const [enabled, setEnabled] = useSectionField<boolean>(index, ["enabled"])
  const [contactsEnabled, setContactsEnabled] = useSectionField<boolean>(index, [
    "contacts",
    "enabled",
  ])
  const idSelector = useMemo(() => selectSectionId(index), [index])
  const id = useContentEditorStore(idSelector)!

  return (
    <SortableListItem
      itemId={id}
      isEnabled={enabled}
      itemTitle="Card Profile"
      onIsEnabledChange={setEnabled}
    >
      <FieldGroup className="p-5">
        <ProfileDetailsForm index={index} />
        <ProfileInfoForm index={index} />
        <FieldSeparator />
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Quick Contact links with Icons</FieldLabel>
          <Switch checked={contactsEnabled} onCheckedChange={setContactsEnabled} />
        </Field>
        <QuickContactLinksForm index={index} />
        <AddMoreContactIconsForm index={index} />
      </FieldGroup>
    </SortableListItem>
  )
})
