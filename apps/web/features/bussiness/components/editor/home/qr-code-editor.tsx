import { useCallback, useRef } from "react"
import { QrColorForm } from "@/features/bussiness/components/form/editor/code/color"
import { QrFrameForm } from "@/features/bussiness/components/form/editor/code/frame"
import { QrLogoForm } from "@/features/bussiness/components/form/editor/code/logo"
import { QrPatternForm } from "@/features/bussiness/components/form/editor/code/pattern"
import { QrShapeForm } from "@/features/bussiness/components/form/editor/code/shape"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"

export default function QrCodeEditor() {
  const formRef = useRef<HTMLFormElement>(null)

  const onSubmitCallback = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("finished")
  }, [])

  return (
    <form id="qr-code-editor" onSubmit={onSubmitCallback} ref={formRef}>
      <EditorBlock defaultValue="qr-shape-form">
        <QrShapeForm />
        <QrPatternForm />
        <QrFrameForm />
        <QrLogoForm />
        <QrColorForm />
      </EditorBlock>
    </form>
  )
}
