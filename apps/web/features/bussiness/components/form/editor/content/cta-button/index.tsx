import type { CtaButtonSection } from "@app/core/types"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { Textarea } from "@app/ui/components/textarea"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { ToogleLabel } from "@/features/bussiness/components/ui/toogle-label"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const CtaButtonForm = memo(({ index }: ContentSectionProps) => {
  const { ctaButton, updateSectionField } = useContentEditorStore(
    useShallow((state) => ({
      updateSectionField: state.updateSectionField,
      ctaButton: state.sections[index] as CtaButtonSection,
    })),
  )

  return (
    <SortableListItem
      itemId={ctaButton?.id}
      itemTitle="Button"
      isEnabled={ctaButton?.enabled}
      onIsEnabledChange={(value) => updateSectionField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <Field>
          <ToogleLabel
            label="Heading"
            isActive={ctaButton?.heading?.enabled}
            onToggle={(value) => updateSectionField(index, ["heading", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={ctaButton?.heading?.text}
            onChange={(e) => updateSectionField(index, ["heading", "text"], e?.target?.value ?? "")}
          />
        </Field>
        <Field>
          <ToogleLabel
            label="Description"
            isActive={ctaButton?.description?.enabled}
            onToggle={(value) => updateSectionField(index, ["description", "enabled"], value)}
          />
          <Textarea
            variant="gray"
            value={ctaButton?.description?.text}
            onChange={(e) =>
              updateSectionField(index, ["description", "text"], e?.target?.value ?? "")
            }
          />
        </Field>

        <div className="grid @lg/editor-block-content:grid-cols-2 gap-3">
          <Field>
            <FieldLabel>Button Label</FieldLabel>
            <Input
              variant="gray"
              placeholder="Enter button label here"
              value={ctaButton?.label}
              onChange={(e) => updateSectionField(index, ["label"], e?.target?.value ?? "")}
            />
          </Field>
          <Field>
            <FieldLabel>Button Link</FieldLabel>
            <Input
              variant="gray"
              value={ctaButton?.link}
              placeholder="Enter button link here"
              onChange={(e) => updateSectionField(index, ["link"], e?.target?.value ?? "")}
            />
          </Field>
        </div>
      </FieldGroup>
      <EditorBlockFooter>
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Section Background</FieldLabel>
          <Switch
            checked={ctaButton?.background}
            onCheckedChange={(value) => updateSectionField(index, ["background"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
})
