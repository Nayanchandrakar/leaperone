import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { useCallback } from "react"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface FloatingCardButtonFormProps {
  sectionIdx: number
  id: string
}

export function FloatingCardButtonForm({ id, sectionIdx }: FloatingCardButtonFormProps) {
  const section = useContentSection(sectionIdx)
  const updateSectionField = useContentEditorStore((state) => state.updateSectionField)

  const handleEnabledChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["enabled"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  const handleLabelEnabledChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["label", "enabled"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  const handleLabelTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSectionField(sectionIdx, ["label", "text"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleQrButtonChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["showQrButton"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  const handleShareButtonChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["showShareButton"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  if (section.type !== "floating-button") return null

  return (
    <EditorSortItem
      id={id}
      contentClassName="p-0"
      name="Floating Card-Buttons"
      checked={section.enabled}
      onCheckedChange={handleEnabledChange}
    >
      <FieldGroup className="p-5">
        <FieldLabel htmlFor={`section-${sectionIdx}-label-enabled`} className="flex-row gap-2">
          <span>Add to Contact button</span>
          <Switch
            id={`section-${sectionIdx}-label-enabled`}
            checked={section.label.enabled}
            onCheckedChange={handleLabelEnabledChange}
          />
        </FieldLabel>

        {section.label.enabled && (
          <div className="p-5 bg-muted rounded-xl border border-border">
            <Field>
              <FieldLabel htmlFor={`section-${sectionIdx}-label-text`}>Button Text</FieldLabel>
              <Input
                id={`section-${sectionIdx}-label-text`}
                value={section.label.text}
                onChange={handleLabelTextChange}
              />
            </Field>
          </div>
        )}
      </FieldGroup>

      <EditorBlockFooter className="flex flex-col @sm/editor-block-content:flex-row gap-3">
        <FieldLabel htmlFor={`section-${sectionIdx}-qr-button`} className="flex-row gap-2">
          <span>Card QR Button</span>
          <Switch
            id={`section-${sectionIdx}-qr-button`}
            checked={section.showQrButton}
            onCheckedChange={handleQrButtonChange}
          />
        </FieldLabel>
        <FieldLabel htmlFor={`section-${sectionIdx}-share-button`} className="flex-row gap-2">
          <span>Card Sharing Button</span>
          <Switch
            id={`section-${sectionIdx}-share-button`}
            checked={section.showShareButton}
            onCheckedChange={handleShareButtonChange}
          />
        </FieldLabel>
      </EditorBlockFooter>
    </EditorSortItem>
  )
}
