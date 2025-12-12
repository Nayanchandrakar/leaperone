import type { FloatingButtonSection } from "@app/core/types"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { useShallow } from "zustand/react/shallow"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface FloatingCardButtonFormProps {
  index: number
}

export function FloatingCardButtonForm({ index }: FloatingCardButtonFormProps) {
  const { field, updateField } = useContentEditorStore(
    useShallow((state) => ({
      updateField: state.updateSectionField,
      field: state.sections[index] as FloatingButtonSection,
    })),
  )

  return (
    <SortableListItem
      itemId={field?.id}
      isEnabled={field?.enabled}
      itemTitle="Floating Card-Buttons"
      onIsEnabledChange={(value) => updateField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Add to Contact button</FieldLabel>
          <Switch
            checked={field?.label?.enabled}
            onCheckedChange={(value) => updateField(index, ["label", "enabled"], value)}
          />
        </Field>

        {field?.label?.enabled && (
          <div className="p-5 bg-muted rounded-xl border border-border">
            <Field>
              <FieldLabel>Button Text</FieldLabel>
              <Input
                value={field?.label?.text}
                onChange={(e) => updateField(index, ["label", "text"], e?.target?.value)}
              />
            </Field>
          </div>
        )}
      </FieldGroup>

      <EditorBlockFooter className="flex flex-col @sm/editor-block-content:flex-row gap-3">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Card QR Button</FieldLabel>
          <Switch
            checked={field?.showQrButton}
            onCheckedChange={(value) => updateField(index, ["showQrButton"], value)}
          />
        </Field>

        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Card Sharing Button</FieldLabel>
          <Switch
            checked={field?.showShareButton}
            onCheckedChange={(value) => updateField(index, ["showShareButton"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
}
