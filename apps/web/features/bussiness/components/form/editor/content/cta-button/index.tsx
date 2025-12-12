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

interface CtaButtonFormProps {
  index: number
}

export const CtaButtonForm = memo(({ index }: CtaButtonFormProps) => {
  const { field, updateField } = useContentEditorStore(
    useShallow((state) => ({
      updateField: state.updateSectionField,
      field: state.sections[index] as CtaButtonSection,
    })),
  )

  return (
    <SortableListItem
      itemId={field?.id}
      itemTitle="Button"
      isEnabled={field?.enabled}
      onIsEnabledChange={(value) => updateField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <Field>
          <ToogleLabel
            label="Heading"
            isActive={field?.heading?.enabled}
            onToggle={(value) => updateField(index, ["heading", "enabled"], value)}
          />
          <Input
            variant="gray"
            value={field?.heading?.text}
            onChange={(e) => updateField(index, ["heading", "text"], e?.target?.value ?? "")}
          />
        </Field>
        <Field>
          <ToogleLabel
            label="Description"
            isActive={field?.description?.enabled}
            onToggle={(value) => updateField(index, ["description", "enabled"], value)}
          />
          <Textarea
            variant="gray"
            value={field?.description?.text}
            onChange={(e) => updateField(index, ["description", "text"], e?.target?.value ?? "")}
          />
        </Field>

        <div className="grid @lg/editor-block-content:grid-cols-2 gap-3">
          <Field>
            <FieldLabel htmlFor={`section-${index}-label`}>Button Label</FieldLabel>
            <Input
              id={`section-${index}-label`}
              variant="gray"
              placeholder="Enter button label here"
              value={field?.label}
              onChange={(e) => updateField(index, ["label"], e?.target?.value ?? "")}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor={`section-${index}-link`}>Button Link</FieldLabel>
            <Input
              id={`section-${index}-link`}
              variant="gray"
              placeholder="Enter button link here"
              value={field?.link}
              onChange={(e) => updateField(index, ["link"], e?.target?.value ?? "")}
            />
          </Field>
        </div>
      </FieldGroup>
      <EditorBlockFooter>
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Section Background</FieldLabel>
          <Switch
            checked={field?.background}
            onCheckedChange={(value) => updateField(index, ["background"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
})
