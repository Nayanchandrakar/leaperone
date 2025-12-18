import type { FloatingButtonSection } from "@app/core/types"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"

interface FloatingCardButtonFormProps {
  index: number
}

export const FloatingCardButtonForm = memo(({ index }: FloatingCardButtonFormProps) => {
  const { floatingButton, updateSectionField } = useContentEditorStore(
    useShallow((state) => ({
      updateSectionField: state.updateSectionField,
      floatingButton: state.sections[index] as FloatingButtonSection,
    })),
  )

  return (
    <SortableListItem
      itemId={floatingButton?.id}
      isEnabled={floatingButton?.enabled}
      itemTitle="Floating Card-Buttons"
      onIsEnabledChange={(value) => updateSectionField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Add to Contact button</FieldLabel>
          <Switch
            checked={floatingButton?.label?.enabled}
            onCheckedChange={(value) => updateSectionField(index, ["label", "enabled"], value)}
          />
        </Field>

        {floatingButton?.label?.enabled && (
          <div className="p-5 bg-muted rounded-xl border border-border">
            <Field>
              <FieldLabel>Button Text</FieldLabel>
              <Input
                value={floatingButton?.label?.text}
                onChange={(e) => {
                  updateSectionField(index, ["label", "text"], e?.target?.value ?? "")
                }}
              />
            </Field>
          </div>
        )}
      </FieldGroup>

      <EditorBlockFooter className="flex flex-col @sm/editor-block-content:flex-row gap-3">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Card QR Button</FieldLabel>
          <Switch
            checked={floatingButton?.showQrButton}
            onCheckedChange={(value) => updateSectionField(index, ["showQrButton"], value)}
          />
        </Field>

        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Card Sharing Button</FieldLabel>
          <Switch
            checked={floatingButton?.showShareButton}
            onCheckedChange={(value) => updateSectionField(index, ["showShareButton"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
})
