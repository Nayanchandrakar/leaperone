import { useCallback } from "react"
import { useAppForm } from "@/components/ui/app-form"
import { BackgroundChangeForm } from "@/features/bussiness/components/form/editor/design/background-change-form"
import { ColorChangeForm } from "@/features/bussiness/components/form/editor/design/color-change-form"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { DEFAULT_DESIGN_SETTINGS } from "@/features/bussiness/constants/home/default-design-settings"

export default function DesignEditor() {
  const form = useAppForm({
    defaultValues: DEFAULT_DESIGN_SETTINGS,
  })

  const onSubmitCallback = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      e.stopPropagation()
      void form.handleSubmit(onSubmitCallback)
    },
    [form],
  )

  return (
    <form onSubmit={onSubmitCallback}>
      <form.AppForm>
        <EditorBlock defaultValue="color-section">
          <BackgroundChangeForm form={form} />
          <ColorChangeForm form={form} />
        </EditorBlock>
      </form.AppForm>
    </form>
  )
}
