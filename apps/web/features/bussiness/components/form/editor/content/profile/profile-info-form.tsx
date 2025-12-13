import type { ProfileCardSection } from "@app/core/types"
import { Field } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { useShallow } from "zustand/react/shallow"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface ProfileInfoFormProps {
  index: number
}

export function ProfileInfoForm({ index }: ProfileInfoFormProps) {
  const { section, updateField } = useContentEditorStore(
    useShallow((state) => ({
      section: state.sections[index] as ProfileCardSection,
      updateField: state.updateSectionField,
    })),
  )

  return (
    <>
      <Field>
        <ToogleLabel
          label="Name"
          isActive={section.name.enabled}
          onToggle={(value) => updateField(index, ["name", "enabled"], value)}
        />
        <Input
          variant="gray"
          value={section.name.name}
          onChange={(e) => updateField(index, ["name", "name"], e?.target?.value ?? "")}
        />
      </Field>
      <div className="grid @lg/editor-block-content:grid-cols-2 gap-3">
        <Field>
          <ToogleLabel
            label="Info Line 1"
            isActive={section.info.primary.enabled}
            onToggle={(value) => updateField(index, ["info", "primary", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={section.info.primary.text}
            onChange={(e) =>
              updateField(index, ["info", "primary", "text"], e?.target?.value ?? "")
            }
          />
        </Field>

        <Field>
          <ToogleLabel
            label="Info Line 2"
            isActive={section.info.secondary.enabled}
            onToggle={(value) => updateField(index, ["info", "secondary", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={section.info.secondary.text}
            onChange={(e) =>
              updateField(index, ["info", "secondary", "text"], e?.target?.value ?? "")
            }
          />
        </Field>
      </div>
    </>
  )
}
