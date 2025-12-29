import { memo } from "react"
import { BackgroundChangeForm } from "@/features/bussiness/components/form/editor/design/background"
import { BackgroundStyleForm } from "@/features/bussiness/components/form/editor/design/background-style"
import { CardLoadingForm } from "@/features/bussiness/components/form/editor/design/card-loading"
import { ColorChangeForm } from "@/features/bussiness/components/form/editor/design/color"
import { FontChangeForm } from "@/features/bussiness/components/form/editor/design/font"
import { CardSettingsForm } from "@/features/bussiness/components/form/editor/design/settings"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"

const DesignEditor = memo(() => {
  return (
    <EditorBlock defaultValue="background-image-section">
      <BackgroundChangeForm />
      <ColorChangeForm />
      <FontChangeForm />
      <BackgroundStyleForm />
      <CardLoadingForm />
      <CardSettingsForm />
    </EditorBlock>
  )
})

export default DesignEditor
