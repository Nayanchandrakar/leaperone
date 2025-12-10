import { Field, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useCallback } from "react"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface ProfileInfoFormProps {
  sectionIdx: number
}

export function ProfileInfoForm({ sectionIdx }: ProfileInfoFormProps) {
  const section = useContentSection(sectionIdx)
  const updateSectionField = useContentEditorStore((state) => state.updateSectionField)

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSectionField(sectionIdx, ["name", "name"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleNameEnabledToggle = useCallback(() => {
    if (section.type === "profile") {
      updateSectionField(sectionIdx, ["name", "enabled"], !section.name.enabled)
    }
  }, [section, sectionIdx, updateSectionField])

  const handlePrimaryTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSectionField(sectionIdx, ["info", "primary", "text"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handlePrimaryEnabledToggle = useCallback(() => {
    if (section.type === "profile") {
      updateSectionField(sectionIdx, ["info", "primary", "enabled"], !section.info.primary.enabled)
    }
  }, [section, sectionIdx, updateSectionField])

  const handleSecondaryTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSectionField(sectionIdx, ["info", "secondary", "text"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleSecondaryEnabledToggle = useCallback(() => {
    if (section.type === "profile") {
      updateSectionField(
        sectionIdx,
        ["info", "secondary", "enabled"],
        !section.info.secondary.enabled,
      )
    }
  }, [section, sectionIdx, updateSectionField])

  if (section.type !== "profile") return null

  return (
    <FieldSet>
      <Field>
        <FieldLabel className="flex items-center justify-between">
          <span>Name</span>
          <button
            type="button"
            onClick={handleNameEnabledToggle}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {section.name.enabled ? (
              <EyeIcon className="size-4" />
            ) : (
              <EyeOffIcon className="size-4" />
            )}
          </button>
        </FieldLabel>
        <Input variant="gray" value={section.name.name} onChange={handleNameChange} />
      </Field>
      <div className="grid @lg/editor-block-content:grid-cols-2 gap-3">
        <Field>
          <FieldLabel className="flex items-center justify-between">
            <span>Info Line 1</span>
            <button
              type="button"
              onClick={handlePrimaryEnabledToggle}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {section.info.primary.enabled ? (
                <EyeIcon className="size-4" />
              ) : (
                <EyeOffIcon className="size-4" />
              )}
            </button>
          </FieldLabel>
          <Input
            variant="gray"
            value={section.info.primary.text}
            onChange={handlePrimaryTextChange}
          />
        </Field>
        <Field>
          <FieldLabel className="flex items-center justify-between">
            <span>Info Line 2</span>
            <button
              type="button"
              onClick={handleSecondaryEnabledToggle}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {section.info.secondary.enabled ? (
                <EyeIcon className="size-4" />
              ) : (
                <EyeOffIcon className="size-4" />
              )}
            </button>
          </FieldLabel>
          <Input
            variant="gray"
            value={section.info.secondary.text}
            onChange={handleSecondaryTextChange}
          />
        </Field>
      </div>
    </FieldSet>
  )
}
