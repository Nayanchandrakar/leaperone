import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
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
import { BussinessHoursList } from "./bussiness-hours-list"

export const BussinessHourSection = memo(({ index }: ContentSectionProps) => {
  const idSelector = useMemo(() => selectSectionId(index), [index])
  const id = useContentEditorStore(idSelector)!

  const [enabled, setEnabled] = useSectionField<boolean>(index, ["enabled"])
  const [headingEnabled, setHeadingEnabled] = useSectionField<boolean>(index, [
    "heading",
    "enabled",
  ])
  const [headingText, setHeadingText] = useSectionField<string>(index, ["heading", "text"])
  const [descEnabled, setDescEnabled] = useSectionField<boolean>(index, ["description", "enabled"])

  const [background, setBackground] = useSectionField<boolean>(index, ["background"])
  const [descText, setDescText] = useSectionField<string>(index, ["description", "text"])

  const [timingEnabled, setTimingEnabled] = useSectionField<boolean>(index, ["timing", "enabled"])

  return (
    <SortableListItem
      itemId={id}
      isEnabled={enabled}
      itemTitle="Business Hours"
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

        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Timing Table</FieldLabel>
          <Switch checked={timingEnabled} onCheckedChange={setTimingEnabled} />
        </Field>
        <BussinessHoursList index={index} />
      </FieldGroup>
      <SectionBackgroundToggle enabled={background} onEnabledChange={setBackground} />
    </SortableListItem>
  )
})
