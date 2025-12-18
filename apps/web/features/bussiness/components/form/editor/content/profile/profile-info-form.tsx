import type { ProfileCardSection } from "@app/core/types"
import { Field } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ProfileInfoForm = memo(({ index }: ContentSectionProps) => {
  const { section, updateSectionField } = useContentEditorStore(
    useShallow((state) => ({
      section: state.sections[index] as ProfileCardSection,
      updateSectionField: state.updateSectionField,
    })),
  )

  return (
    <>
      <Field>
        <ToogleLabel
          label="Name"
          isActive={section?.name?.enabled}
          onToggle={(value) => updateSectionField(index, ["name", "enabled"], value)}
        />
        <Input
          variant="gray"
          value={section?.name?.name}
          onChange={(e) => updateSectionField(index, ["name", "name"], e?.target?.value ?? "")}
        />
      </Field>
      <div className="grid @lg/editor-block-content:grid-cols-2 gap-3">
        <Field>
          <ToogleLabel
            label="Info Line 1"
            isActive={section?.info?.primary?.enabled}
            onToggle={(value) => updateSectionField(index, ["info", "primary", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={section?.info?.primary?.text}
            onChange={(e) => {
              updateSectionField(index, ["info", "primary", "text"], e?.target?.value ?? "")
            }}
          />
        </Field>
        <Field>
          <ToogleLabel
            label="Info Line 2"
            isActive={section?.info?.secondary?.enabled}
            onToggle={(value) => updateSectionField(index, ["info", "secondary", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={section?.info?.secondary?.text}
            onChange={(e) => {
              updateSectionField(index, ["info", "secondary", "text"], e?.target?.value ?? "")
            }}
          />
        </Field>
      </div>
    </>
  )
})
