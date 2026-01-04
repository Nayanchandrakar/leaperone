import { FieldGroup } from "@app/ui/components/field"
import { memo, useMemo } from "react"
import { AddLinkDialog } from "@/features/bussiness/components/dialogs/home/add-link"
import { SectionBackgroundToggle } from "@/features/bussiness/components/fields/section-background-toggle"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
import { ToggleTextareaField } from "@/features/bussiness/components/fields/toggle-textarea-field"
import { RenderLinksForm } from "@/features/bussiness/components/form/editor/content/links/render-links-form"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSectionField } from "@/features/bussiness/hooks/home/use-section-field"
import {
  selectSectionId,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const SocialLinksForm = memo(({ index }: ContentSectionProps) => {
  const [enabled, setEnabled] = useSectionField<boolean>(index, ["enabled"])
  const [headingEnabled, setHeadingEnabled] = useSectionField<boolean>(index, [
    "heading",
    "enabled",
  ])
  const [headingText, setHeadingText] = useSectionField<string>(index, ["heading", "text"])

  const [descEnabled, setDescEnabled] = useSectionField<boolean>(index, ["description", "enabled"])
  const [descText, setDescText] = useSectionField<string>(index, ["description", "text"])

  const [background, setBackground] = useSectionField<boolean>(index, ["background"])

  const idSelector = useMemo(() => selectSectionId(index), [index])
  const id = useContentEditorStore(idSelector)!

  return (
    <SortableListItem
      itemId={id}
      isEnabled={enabled}
      onIsEnabledChange={setEnabled}
      itemTitle="Links: Social, Payment & more"
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
        <RenderLinksForm index={index} />
        <AddLinkDialog index={index} />
      </FieldGroup>
      <SectionBackgroundToggle enabled={background} onEnabledChange={setBackground} />
    </SortableListItem>
  )
})
