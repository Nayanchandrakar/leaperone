import { BackgroundChangeForm } from "@/features/bussiness/components/form/editor/design/background"
import { BackgroundStyleForm } from "@/features/bussiness/components/form/editor/design/background-style"
import { CardLoadingForm } from "@/features/bussiness/components/form/editor/design/card-loading"
import { ColorChangeForm } from "@/features/bussiness/components/form/editor/design/color"
import { CardSettingsForm } from "@/features/bussiness/components/form/editor/design/settings"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { useDesignEditor } from "@/features/bussiness/hooks/home/use-design-editor"

export default function DesignEditor() {
  const { form, formRef, onSubmitCallback } = useDesignEditor()

  return (
    <form id="design-editor-form" ref={formRef} onSubmit={onSubmitCallback}>
      <form.AppForm>
        <EditorBlock defaultValue="background-style-section">
          {/* @ts-ignore - TODO: fix this */}
          <BackgroundChangeForm form={form} />
          {/* @ts-ignore - TODO: fix this */}
          <ColorChangeForm form={form} />
          {/* @ts-ignore - TODO: fix this */}
          <BackgroundStyleForm form={form} />
          {/* @ts-ignore - TODO: fix this */}
          <CardLoadingForm form={form} />
          {/* @ts-ignore - TODO: fix this */}
          <CardSettingsForm form={form} />
        </EditorBlock>
      </form.AppForm>
    </form>
  )
}
