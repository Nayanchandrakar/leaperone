import { BackgroundChangeForm } from "@/features/bussiness/components/form/editor/design/background"
import { BackgroundStyleForm } from "@/features/bussiness/components/form/editor/design/background-style"
import { CardLoadingForm } from "@/features/bussiness/components/form/editor/design/card-loading"
import { ColorChangeForm } from "@/features/bussiness/components/form/editor/design/color"
import { CardSettingsForm } from "@/features/bussiness/components/form/editor/design/settings"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"

export default function DesignEditor() {
  return (
    <EditorBlock defaultValue="background-image-section">
      <BackgroundChangeForm />
      <ColorChangeForm />
      <BackgroundStyleForm />
      <CardLoadingForm />
      <CardSettingsForm />
    </EditorBlock>
  )
}
