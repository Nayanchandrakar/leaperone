import type { FloatingButtonSection } from "@app/core/types"
import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Input } from "@app/ui/components/input"
import { Switch } from "@app/ui/components/switch"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const FloatingCardButtonForm = memo(({ index }: ContentSectionProps) => {
  const { id, enabled, label, showQrButton, showShareButton, updateSectionField } =
    useContentEditorStore(
      useShallow((state) => {
        const section = state.sections[index] as FloatingButtonSection
        return {
          id: section?.id ?? "",
          enabled: section?.enabled ?? false,
          label: section?.label,
          showQrButton: section?.showQrButton,
          showShareButton: section?.showShareButton,
          updateSectionField: state.updateSectionField,
        }
      }),
    )

  return (
    <SortableListItem
      itemId={id}
      isEnabled={enabled}
      itemTitle="Floating Card-Buttons"
      onIsEnabledChange={(value) => updateSectionField(index, ["enabled"], value)}
    >
      <FieldGroup className="p-5">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Add to Contact button</FieldLabel>
          <Switch
            checked={label?.enabled}
            onCheckedChange={(value) => updateSectionField(index, ["label", "enabled"], value)}
          />
        </Field>

        {label?.enabled && (
          <div className="p-5 bg-muted rounded-xl border border-border">
            <Field>
              <FieldLabel>Button Text</FieldLabel>
              <Input
                value={label?.text}
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
            checked={showQrButton}
            onCheckedChange={(value) => updateSectionField(index, ["showQrButton"], value)}
          />
        </Field>

        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Card Sharing Button</FieldLabel>
          <Switch
            checked={showShareButton}
            onCheckedChange={(value) => updateSectionField(index, ["showShareButton"], value)}
          />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
})
