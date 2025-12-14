import type { LinkSection } from "@app/core/types/content-editor"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { useCallback } from "react"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { RenderLinksForm } from "./render-links-form"

interface SocialLinksFormProps {
  index: number
}

export function SocialLinksForm({ index }: SocialLinksFormProps) {
  const section = useContentEditorStore((state) => state.sections[index] as LinkSection)
  const updateSectionField = useContentEditorStore((state) => state.updateSectionField)

  const handleEnabledChange = useCallback(
    (checked: boolean) => {
      updateSectionField(index, ["enabled"], checked)
    },
    [index, updateSectionField],
  )

  const handleHeadingEnabledToggle = useCallback(() => {
    if (section.type === "social-links") {
      updateSectionField(index, ["heading", "enabled"], !section.heading.enabled)
    }
  }, [section, index, updateSectionField])

  const handleDescriptionEnabledToggle = useCallback(() => {
    if (section.type === "social-links") {
      updateSectionField(index, ["description", "enabled"], !section.description.enabled)
    }
  }, [section, index, updateSectionField])

  return (
    <SortableListItem
      itemId={section.id}
      isEnabled={section.enabled}
      onIsEnabledChange={handleEnabledChange}
      itemTitle="Links: Social, Payment & more"
    >
      <FieldGroup className="p-5">
        <Field>
          <ToogleLabel
            label="Heading"
            isActive={section?.heading?.enabled}
            onToggle={handleHeadingEnabledToggle}
          />
          <Input
            variant="gray"
            value={section?.heading?.text}
            onChange={(e) => updateSectionField(index, ["heading", "text"], e?.target?.value ?? "")}
          />
        </Field>

        <Field>
          <ToogleLabel
            label="Description"
            isActive={section?.description?.enabled}
            onToggle={handleDescriptionEnabledToggle}
          />
          <Textarea
            variant="gray"
            value={section?.description?.text}
            onChange={(e) => {
              updateSectionField(index, ["description", "text"], e?.target?.value ?? "")
            }}
          />
        </Field>

        <RenderLinksForm index={index} />
      </FieldGroup>
      <EditorBlockFooter>
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Section Background</FieldLabel>
          <Switch
            checked={section?.background}
            onCheckedChange={(value) => updateSectionField(index, ["background"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
}
