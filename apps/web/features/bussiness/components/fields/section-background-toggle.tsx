import { Field, FieldLabel } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { EditorBlockFooter } from "@/features/bussiness/components/ui/editor-block"

interface SectionBgToogle {
  enabled: boolean
  onEnabledChange: (checked: boolean) => void
}

export function SectionBackgroundToggle({ enabled, onEnabledChange }: SectionBgToogle) {
  return (
    <EditorBlockFooter>
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel>Section Background</FieldLabel>
        <Switch checked={enabled} onCheckedChange={onEnabledChange} />
      </Field>
    </EditorBlockFooter>
  )
}
