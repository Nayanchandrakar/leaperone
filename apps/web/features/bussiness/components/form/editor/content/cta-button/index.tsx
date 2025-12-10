import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useCallback } from "react"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { EditorSortItem } from "@/features/bussiness/components/ui/editor-sort"
import {
  useContentEditorStore,
  useContentSection,
} from "@/features/bussiness/stores/use-content-editor-store"

interface CtaButtonFormProps {
  sectionIdx: number
  id: string
}

export function CtaButtonForm({ id, sectionIdx }: CtaButtonFormProps) {
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
    if (section.type === "cta-button") {
      updateSectionField(sectionIdx, ["heading", "enabled"], !section.heading.enabled)
    }
  }, [section, sectionIdx, updateSectionField])

  const handleDescriptionTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      updateSectionField(sectionIdx, ["description", "text"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleDescriptionEnabledToggle = useCallback(() => {
    if (section.type === "cta-button") {
      updateSectionField(sectionIdx, ["description", "enabled"], !section.description.enabled)
    }
  }, [section, sectionIdx, updateSectionField])

  const handleLabelChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSectionField(sectionIdx, ["label"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleLinkChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSectionField(sectionIdx, ["link"], e.target.value)
    },
    [sectionIdx, updateSectionField],
  )

  const handleBackgroundChange = useCallback(
    (checked: boolean) => {
      updateSectionField(sectionIdx, ["background"], checked)
    },
    [sectionIdx, updateSectionField],
  )

  if (section.type !== "cta-button") return null

  return (
    <EditorSortItem
      name="Button"
      id={id}
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

        <Field>
          <FieldLabel className="flex items-center justify-between">
            <span>Description</span>
            <button
              type="button"
              onClick={handleDescriptionEnabledToggle}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {section.description.enabled ? (
                <EyeIcon className="size-4" />
              ) : (
                <EyeOffIcon className="size-4" />
              )}
            </button>
          </FieldLabel>
          <Textarea
            variant="gray"
            value={section.description.text}
            onChange={handleDescriptionTextChange}
          />
        </Field>

        <div className="grid @lg/editor-block-content:grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor={`section-${sectionIdx}-label`}>Button Label</FieldLabel>
            <Input
              id={`section-${sectionIdx}-label`}
              variant="gray"
              placeholder="Enter button label here"
              value={section.label}
              onChange={handleLabelChange}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor={`section-${sectionIdx}-link`}>Button Link</FieldLabel>
            <Input
              id={`section-${sectionIdx}-link`}
              variant="gray"
              placeholder="Enter button link here"
              value={section.link}
              onChange={handleLinkChange}
            />
          </Field>
        </div>
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
