import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useCallback } from "react"
import { AddContactItemButtonForm } from "@/features/bussiness/components/form/editor/content/contact/add-more-contact-form"
import { ContactItemsList } from "@/features/bussiness/components/form/editor/content/contact/contact-items-list"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface ContactDetailsFormProps {
  sectionIdx: number
  id: string
}

export function ContactDetailsForm({ id, sectionIdx }: ContactDetailsFormProps) {
  const section = useContentSection(sectionIdx)
  const updateSectionField = useContentEditorStore((state) => state.updateSectionField)

  const handleEnabledChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["enabled"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  const handleHeadingTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSectionField(sectionIdx, ["heading", "text"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleHeadingEnabledToggle = useCallback(() => {
    if (section.type === "contact-details") {
      updateSectionField(sectionIdx, ["heading", "enabled"], !section.heading.enabled)
    }
  }, [section, sectionIdx, updateSectionField])

  const handleBackgroundChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["background"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  if (section.type !== "contact-details") return null

  return (
    <EditorSortItem
      id={id}
      name="Contact Details"
      contentClassName="p-0"
      checked={section.enabled}
      onCheckedChange={handleEnabledChange}
    >
      <FieldGroup className="p-5">
        <Field>
          <FieldLabel className="flex items-center justify-between">
            <span>Heading</span>
            <button
              type="button"
              onClick={handleHeadingEnabledToggle}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {section.heading.enabled ? (
                <EyeIcon className="size-4" />
              ) : (
                <EyeOffIcon className="size-4" />
              )}
            </button>
          </FieldLabel>
          <Input variant="gray" value={section.heading.text} onChange={handleHeadingTextChange} />
        </Field>
        <ContactItemsList sectionIdx={sectionIdx} />
        <AddContactItemButtonForm sectionIdx={sectionIdx} />
      </FieldGroup>
      <EditorBlockFooter>
        <FieldLabel htmlFor={`section-${sectionIdx}-background`} className="flex-row gap-2">
          <span>Section Background</span>
          <Switch
            id={`section-${sectionIdx}-background`}
            checked={section.background}
            onCheckedChange={handleBackgroundChange}
          />
        </FieldLabel>
      </EditorBlockFooter>
    </EditorSortItem>
  )
}
