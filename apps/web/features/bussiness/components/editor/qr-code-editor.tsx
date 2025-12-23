import { memo } from "react"
import { QrColorForm } from "@/features/bussiness/components/form/editor/code/color"
import { QrFrameForm } from "@/features/bussiness/components/form/editor/code/frame"
import { QrLogoForm } from "@/features/bussiness/components/form/editor/code/logo"
import { QrPatternForm } from "@/features/bussiness/components/form/editor/code/pattern"
import { QrShapeForm } from "@/features/bussiness/components/form/editor/code/shape"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"

const QrCodeEditor = memo(() => {
  return (
    <EditorBlock defaultValue="qr-shape-form">
      <QrShapeForm />
      <QrPatternForm />
      <QrFrameForm />
      <QrLogoForm />
      <QrColorForm />
    </EditorBlock>
  )
})

export default QrCodeEditor
