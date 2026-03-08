import { FieldGroup } from "@app/ui/components/field"
import { memo, useCallback, useMemo } from "react"
import { SectionBackgroundToggle } from "@/features/bussiness/components/fields/section-background-toggle"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
import { ToggleTextareaField } from "@/features/bussiness/components/fields/toggle-textarea-field"
import { AddPdfFile } from "@/features/bussiness/components/form/editor/content/pdf/add-pdf-file"
import { FilesList } from "@/features/bussiness/components/form/editor/content/pdf/files-list"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSectionField } from "@/features/bussiness/hooks/home/use-section-field"
import {
  selectSectionId,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const PdfFileSectionForm = memo(({ index }: ContentSectionProps) => {
  const removeSection = useContentEditorStore((state) => state.removeSection)
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

  const handleDelete = useCallback(() => removeSection(index), [removeSection, index])

  return (
    <SortableListItem
      itemId={id}
      isEnabled={enabled}
      itemTitle="PDF Files"
      onDelete={handleDelete}
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
        <FilesList index={index} />
        <AddPdfFile index={index} />
      </FieldGroup>
      <SectionBackgroundToggle enabled={background} onEnabledChange={setBackground} />
    </SortableListItem>
  )
})
