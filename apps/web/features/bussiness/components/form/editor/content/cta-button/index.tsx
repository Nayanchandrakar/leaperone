import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { memo, useMemo } from "react"
import { SectionBackgroundToggle } from "@/features/bussiness/components/fields/section-background-toggle"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
import { ToggleTextareaField } from "@/features/bussiness/components/fields/toggle-textarea-field"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSectionField } from "@/features/bussiness/hooks/home/use-section-field"
import {
  selectSectionId,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const CtaButtonForm = memo(({ index }: ContentSectionProps) => {
  const [enabled, setEnabled] = useSectionField<boolean>(index, ["enabled"])
  const [headingEnabled, setHeadingEnabled] = useSectionField<boolean>(index, [
    "heading",
    "enabled",
  ])
  const [headingText, setHeadingText] = useSectionField<string>(index, ["heading", "text"])
  const [descEnabled, setDescEnabled] = useSectionField<boolean>(index, ["description", "enabled"])
  const [descText, setDescText] = useSectionField<string>(index, ["description", "text"])
  const [label, setLabel] = useSectionField<string>(index, ["label"])
  const [link, setLink] = useSectionField<string>(index, ["link"])
  const [background, setBackground] = useSectionField<boolean>(index, ["background"])
  const idSelector = useMemo(() => selectSectionId(index), [index])
  const id = useContentEditorStore(idSelector) ?? ""

  return (
    <SortableListItem
      itemId={id}
      itemTitle="Button"
      isEnabled={enabled}
      onIsEnabledChange={setEnabled}
    >
      <FieldGroup className="p-5">
        <ToggleField
          label="Heading"
          value={headingText}
          enabled={headingEnabled}
          onValueChange={setHeadingText}
          onEnabledChange={setHeadingEnabled}
        />
        <ToggleTextareaField
          variant="gray"
          value={descText}
          label="Description"
          enabled={descEnabled}
          onValueChange={setDescText}
          onEnabledChange={setDescEnabled}
        />

        <div className="grid @lg/editor-block-content:grid-cols-2 gap-3">
          <Field>
            <FieldLabel>Button Label</FieldLabel>
            <Input
              value={label}
              variant="gray"
              placeholder="Enter button label here"
              onChange={(e) => setLabel(e?.target?.value)}
            />
          </Field>
          <Field>
            <FieldLabel>Button Link</FieldLabel>
            <Input
              value={link}
              variant="gray"
              placeholder="Enter button link here"
              onChange={(e) => setLink(e?.target?.value)}
            />
          </Field>
        </div>
      </FieldGroup>
      <SectionBackgroundToggle enabled={background} onEnabledChange={setBackground} />
    </SortableListItem>
  )
})
