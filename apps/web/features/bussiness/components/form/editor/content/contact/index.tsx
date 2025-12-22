import { FieldGroup } from "@app/ui/components/field"
import { memo, useMemo } from "react"
import { SectionBackgroundToggle } from "@/features/bussiness/components/fields/section-background-toggle"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
import { AddContactItemButtonForm } from "@/features/bussiness/components/form/editor/content/contact/add-more-contact-form"
import { ContactItemsList } from "@/features/bussiness/components/form/editor/content/contact/contact-items-list"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSectionField } from "@/features/bussiness/hooks/home/use-section-field"
import {
  selectSectionId,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ContactDetailsForm = memo(({ index }: ContentSectionProps) => {
  const [enabled, setEnabled] = useSectionField<boolean>(index, ["enabled"])
  const [headingEnabled, setHeadingEnabled] = useSectionField<boolean>(index, [
    "heading",
    "enabled",
  ])
  const [headingText, setHeadingText] = useSectionField<string>(index, ["heading", "text"])
  const [background, setBackground] = useSectionField<boolean>(index, ["background"])

  const idSelector = useMemo(() => selectSectionId(index), [index])
  const id = useContentEditorStore(idSelector)!

  return (
    <SortableListItem
      itemId={id}
      itemTitle="Contact Details"
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
        <ContactItemsList index={index} />
        <AddContactItemButtonForm index={index} />
      </FieldGroup>
      <SectionBackgroundToggle enabled={background} onEnabledChange={setBackground} />
    </SortableListItem>
  )
})
