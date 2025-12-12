import type { HeadingTextSection } from "@app/core/types"
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

interface HeadingTextFormProps {
  index: number
}

export const HeadingTextForm = memo(({ index }: HeadingTextFormProps) => {
  const { field, updateField } = useContentEditorStore(
    useShallow((state) => ({
      updateField: state.updateSectionField,
      field: state.sections[index] as HeadingTextSection,
    })),
  )

  return (
    <SortableListItem
      itemId={field?.id}
      itemTitle="Heading + Text"
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
