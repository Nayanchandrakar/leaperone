import { ColorChangeForm } from "@/features/bussiness/components/form/editor/design/color"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"

export default function DesignEditor() {
  return (
    <EditorBlock defaultValue="color-section">
      {/* <BackgroundChangeForm /> */}
      <ColorChangeForm />
      {/* <BackgroundStyleForm /> */}
      {/* <CardLoadingForm /> */}
      {/* <CardSettingsForm /> */}
    </EditorBlock>
  )
}
