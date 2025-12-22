import { Field, FieldGroup, FieldLabel } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { memo, useMemo } from "react"
import { ToggleField } from "@/features/bussiness/components/fields/toggle-field"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"
import { SortableListItem } from "@/features/bussiness/components/ui/sortable-list"
import { useSectionField } from "@/features/bussiness/hooks/home/use-section-field"
import {
  selectSectionId,
  useContentEditorStore,
} from "@/features/bussiness/stores/use-content-editor-store"
import type { ContentSectionProps } from "@/features/bussiness/types"

export const FloatingCardButtonForm = memo(({ index }: ContentSectionProps) => {
  const [enabled, setEnabled] = useSectionField<boolean>(index, ["enabled"])

  const [labelEnabled, setLabelEnabled] = useSectionField<boolean>(index, ["label", "enabled"])
  const [labelText, setLabelText] = useSectionField<string>(index, ["label", "text"])

  const [showQrButton, setShowQrButton] = useSectionField<boolean>(index, ["showQrButton"])
  const [showShareButton, setShowShareButton] = useSectionField<boolean>(index, ["showShareButton"])

  const idSelector = useMemo(() => selectSectionId(index), [index])
  const id = useContentEditorStore(idSelector) ?? ""

  return (
    <SortableListItem
      itemId={id}
      isEnabled={enabled}
      onIsEnabledChange={setEnabled}
      itemTitle="Floating Card-Buttons"
    >
      <FieldGroup className="p-5">
        <ToggleField
          value={labelText}
          enabled={labelEnabled}
          placeholder="Button Text"
          onValueChange={setLabelText}
          label="Add to Contact button"
          onEnabledChange={setLabelEnabled}
        />
      </FieldGroup>
      <EditorBlockFooter className="flex flex-col @sm/editor-block-content:flex-row gap-3">
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Card QR Button</FieldLabel>
          <Switch checked={showQrButton} onCheckedChange={setShowQrButton} />
        </Field>
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Card Sharing Button</FieldLabel>
          <Switch checked={showShareButton} onCheckedChange={setShowShareButton} />
        </Field>
      </EditorBlockFooter>
    </SortableListItem>
  )
})
