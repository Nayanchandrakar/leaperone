import type { ContactDetailsSection } from "@app/core/types"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { AddContactItemButtonForm } from "@/features/bussiness/components/form/editor/content/contact/add-more-contact-form"
import { ContactItemsList } from "@/features/bussiness/components/form/editor/content/contact/contact-items-list"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const ContactDetailsForm = memo(({ index }: ContentSectionProps) => {
  const { id, enabled, heading, background, updateSectionField } = useContentEditorStore(
    useShallow((state) => {
      const section = state.sections[index] as ContactDetailsSection
      return {
        id: section?.id ?? "",
        enabled: section?.enabled ?? false,
        heading: section?.heading,
        background: section?.background,
        updateSectionField: state.updateSectionField,
      }
    }),
  )

  return (
    <SortableListItem
      itemId={id}
      itemTitle="Contact Details"
      isEnabled={enabled}
      onIsEnabledChange={(value) => updateSectionField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <Field>
          <ToogleLabel
            label="Heading"
            isActive={heading?.enabled}
            onToggle={(value) => updateSectionField(index, ["heading", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={heading?.text}
            onChange={(e) => updateSectionField(index, ["heading", "text"], e?.target?.value ?? "")}
          />
        </Field>
        <ContactItemsList index={index} />
        <AddContactItemButtonForm index={index} />
      </FieldGroup>
      <EditorBlockFooter>
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Section Background</FieldLabel>
          <Switch
            checked={background}
            onCheckedChange={(value) => updateSectionField(index, ["background"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
})
