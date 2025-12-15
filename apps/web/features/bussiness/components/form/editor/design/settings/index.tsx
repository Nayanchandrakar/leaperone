import { Field, FieldLabel } from "@app/ui/components/field"
import { Switch } from "@app/ui/components/switch"
import { useShallow } from "zustand/react/shallow"
import {
  EditorBlockContent,
  EditorBlockHeader,
  EditorBlockItem,
  EditorBlockTitle,
  EditorBlockTrigger,
} from "@/features/bussiness/components/ui/editor-block"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"

export function CardSettingsForm() {
  const { settings, setSettings } = useDesignEditorStore(
    useShallow((state) => ({
      setSettings: state.setSettings,
      settings: state.config.settings,
    })),
  )

  return (
    <EditorBlockItem value="card-settings-form">
      <EditorBlockHeader>
        <EditorBlockTitle>Card Settings</EditorBlockTitle>
        <EditorBlockTrigger />
      </EditorBlockHeader>
      <EditorBlockContent>
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel>Show Leaper One branding in your card</FieldLabel>
          <Switch
            checked={settings?.branding}
            onCheckedChange={(value) => setSettings("branding", value)}
          />
        </Field>
      </EditorBlockContent>
    </EditorBlockItem>
  )
}
