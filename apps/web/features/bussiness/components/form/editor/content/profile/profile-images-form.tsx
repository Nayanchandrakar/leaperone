import { Field, FieldLabel } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { useCallback } from "react"
import { EditorImageUploader } from "@/features/bussiness/components/ui/editor-image-uploader"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface ProfileImagesFormProps {
  sectionIdx: number
}

export function ProfileImagesForm({ sectionIdx }: ProfileImagesFormProps) {
  const section = useContentSection(sectionIdx)
  const updateSectionField = useContentEditorStore((state) => state.updateSectionField)

  const handleProfileEnabledChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["details", "profile", "enabled"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  const handleBrandingEnabledChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["details", "branding", "enabled"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  if (section.type !== "profile") return null

  return (
    <div className="flex gap-5 @max-[260px]/editor-block-content:flex-col">
      <Field className="w-fit">
        <FieldLabel htmlFor={`section-${sectionIdx}-profile-pic`} className="flex-row gap-2">
          <span>Profile Pic</span>
          <Switch
            id={`section-${sectionIdx}-profile-pic`}
            checked={section.details.profile.enabled}
            onCheckedChange={handleProfileEnabledChange}
          />
        </FieldLabel>
        <EditorImageUploader src={section.details.profile.imageSrc} />
      </Field>

      <Field className="w-fit">
        <FieldLabel htmlFor={`section-${sectionIdx}-brand-logo`} className="flex-row gap-2">
          <span>Brand Logo</span>
          <Switch
            id={`section-${sectionIdx}-brand-logo`}
            checked={section.details.branding.enabled}
            onCheckedChange={handleBrandingEnabledChange}
          />
        </FieldLabel>
        <EditorImageUploader src={section.details.branding.imageSrc} />
      </Field>
    </div>
  )
}
