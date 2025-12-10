import { FieldGroup, FieldLabel, FieldSeparator } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { useCallback } from "react"
import { AddMoreContactIconsForm } from "@/features/bussiness/components/form/editor/content/profile/add-more-contact-icons-form"
import { ProfileContactsForm } from "@/features/bussiness/components/form/editor/content/profile/profile-contacts-form"
import { ProfileImagesForm } from "@/features/bussiness/components/form/editor/content/profile/profile-images-form"
import { ProfileInfoForm } from "@/features/bussiness/components/form/editor/content/profile/profile-info-form"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface FormProps {
  sectionIdx: number
  id: string
}

export function ProfileForm({ sectionIdx, id }: FormProps) {
  const section = useContentSection(sectionIdx)
  const updateSectionField = useContentEditorStore((state) => state.updateSectionField)

  const handleEnabledChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["enabled"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  const handleContactsEnabledChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["contacts", "enabled"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  if (section.type !== "profile") return null

  return (
    <EditorSortItem
      id={id}
      name="Card Profile"
      checked={section.enabled}
      onCheckedChange={handleEnabledChange}
    >
      <FieldGroup>
        <ProfileImagesForm sectionIdx={sectionIdx} />
        <ProfileInfoForm sectionIdx={sectionIdx} />
        <FieldSeparator />
        <FieldLabel htmlFor={`section-${sectionIdx}-contacts`} className="flex-row gap-2">
          <span>Quick Contact links with Icons</span>
          <Switch
            id={`section-${sectionIdx}-contacts`}
            checked={section.contacts.enabled}
            onCheckedChange={handleContactsEnabledChange}
          />
        </FieldLabel>
        <ProfileContactsForm sectionIdx={sectionIdx} />
        <AddMoreContactIconsForm sectionIdx={sectionIdx} />
      </FieldGroup>
    </EditorSortItem>
  )
}
