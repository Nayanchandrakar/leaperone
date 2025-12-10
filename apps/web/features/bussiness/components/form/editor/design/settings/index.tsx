import { FieldGroup, FieldLabel, FieldSet } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { useCallback } from "react"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import {
  useDesignEditorStore,
  useDesignSettings,
} from "@/features/bussiness/stores/use-design-editor-store"

export function CardSettingsForm() {
  const settings = useDesignSettings()
  const setSettings = useDesignEditorStore((state) => state.setSettings)

  const handleBrandingChange = useCallback(
    (checked: boolean) => {
      setSettings("branding", checked)
    },
    [setSettings],
  )

  return (
    <EditorBlockItem value="card-settings-form">
      <EditorBlockHeader>
        <EditorBlockTitle>Card Settings</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <FieldGroup>
          <FieldSet>
            <FieldLabel htmlFor="settings-branding" className="flex-row gap-2">
              <span>Show Leaper One branding in your card</span>
              <Switch
                id="settings-branding"
                checked={settings.branding}
                onCheckedChange={handleBrandingChange}
              />
            </FieldLabel>
          </FieldSet>
        </FieldGroup>
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
