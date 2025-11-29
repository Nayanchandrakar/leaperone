import { QrFrameForm } from "@/features/bussiness/components/form/editor/code/frame"
import { QrPatternForm } from "@/features/bussiness/components/form/editor/code/pattern"
import { QrShapeForm } from "@/features/bussiness/components/form/editor/code/shape"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { useQrCodeEditor } from "@/features/bussiness/hooks/home/use-qr-code-editor"

export default function QrCodeEditor() {
  const { form, formRef, onSubmitCallback } = useQrCodeEditor()
  return (
    <form id="qr-code-editor" onSubmit={onSubmitCallback} ref={formRef}>
      <form.AppForm>
        <EditorBlock defaultValue="qr-shape-form">
          <QrShapeForm form={form} />
          <QrPatternForm form={form} />
          <QrFrameForm form={form} />
        </EditorBlock>
      </form.AppForm>
    </form>
  )
}
