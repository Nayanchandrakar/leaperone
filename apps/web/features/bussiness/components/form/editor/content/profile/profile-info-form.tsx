import { memo } from "react"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
import { useSectionField } from "@/features/bussiness/hooks/home/use-section-field"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ProfileInfoForm = memo(({ index }: ContentSectionProps) => {
  const [primaryEnabled, setPrimaryEnabled] = useSectionField<boolean>(index, [
    "info",
    "primary",
    "enabled",
  ])
  const [primaryText, setPrimaryText] = useSectionField<string>(index, ["info", "primary", "text"])
  const [secondaryEnabled, setSecondaryEnabled] = useSectionField<boolean>(index, [
    "info",
    "secondary",
    "enabled",
  ])
  const [secondaryText, setSecondaryText] = useSectionField<string>(index, [
    "info",
    "secondary",
    "text",
  ])
  const [nameText, setNameText] = useSectionField<string>(index, ["name", "name"])
  const [nameEnabled, setNameEnabled] = useSectionField<boolean>(index, ["name", "enabled"])

  return (
    <>
      <ToggleField
        label="Name"
        value={nameText}
        enabled={nameEnabled}
        onValueChange={setNameText}
        onEnabledChange={setNameEnabled}
      />
      <div className="grid @lg/editor-block-content:grid-cols-2 gap-3">
        <ToggleField
          label="Info Line 1"
          value={primaryText}
          enabled={primaryEnabled}
          onValueChange={setPrimaryText}
          onEnabledChange={setPrimaryEnabled}
        />
        <ToggleField
          label="Info Line 2"
          value={secondaryText}
          enabled={secondaryEnabled}
          onValueChange={setSecondaryText}
          onEnabledChange={setSecondaryEnabled}
        />
      </div>
    </>
  )
})
