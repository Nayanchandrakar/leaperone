import { memo } from "react"
import { ImageToggleField } from "@/features/bussiness/components/fields/image-toggle-field"
import { useSectionField } from "@/features/bussiness/hooks/home/use-section-field"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ProfileDetailsForm = memo(({ index }: ContentSectionProps) => {
  const [profileEnabled, setProfileEnabled] = useSectionField<boolean>(index, [
    "details",
    "profile",
    "enabled",
  ])
  const [profileImage] = useSectionField<string>(index, ["details", "profile", "imageSrc"])
  const [brandingEnabled, setBrandingEnabled] = useSectionField<boolean>(index, [
    "details",
    "branding",
    "enabled",
  ])
  const [brandingImage] = useSectionField<string>(index, ["details", "branding", "imageSrc"])

  return (
    <div className="flex gap-5 @max-[260px]/editor-block-content:flex-col">
      <ImageToggleField
        label="Profile Pic"
        imageSrc={profileImage}
        enabled={profileEnabled}
        onEnabledChange={setProfileEnabled}
      />
      <ImageToggleField
        label="Brand Logo"
        imageSrc={brandingImage}
        enabled={brandingEnabled}
        onEnabledChange={setBrandingEnabled}
      />
    </div>
  )
})
