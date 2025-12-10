import { memo, useRef } from "react"
import { QrColorForm } from "@/features/bussiness/components/form/editor/code/color"
import { QrFrameForm } from "@/features/bussiness/components/form/editor/code/frame"
import { QrLogoForm } from "@/features/bussiness/components/form/editor/code/logo"
import { QrPatternForm } from "@/features/bussiness/components/form/editor/code/pattern"
import { QrShapeForm } from "@/features/bussiness/components/form/editor/code/shape"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { useQrCodeEditorForm } from "@/features/bussiness/hooks/home/use-qr-code-editor-form"

/**
 * QrCodeEditorForms - Renders all QR code editor sub-forms
 * Extracted to separate component for better organization and potential memoization
 */
const QrCodeEditorForms = memo(() => (
  <>
    <QrShapeForm />
    <QrPatternForm />
    <QrFrameForm />
    <QrLogoForm />
    <QrColorForm />
  </>
))

QrCodeEditorForms.displayName = "QrCodeEditorForms"

/**
 * QrCodeEditor - Main form component for editing QR code settings
 * Implements SRP by delegating logic to custom hook and sub-components
 * Optimized with React.memo to prevent unnecessary re-renders
 */
function QrCodeEditorBase() {
  const formRef = useRef<HTMLFormElement>(null)
  const { handleSubmit } = useQrCodeEditorForm()

  return (
    <form id="qr-code-editor" onSubmit={handleSubmit} ref={formRef}>
      <EditorBlock defaultValue="qr-shape-form">
        <QrCodeEditorForms />
      </EditorBlock>
    </form>
  )
}

// Memoized export to prevent unnecessary re-renders
export default memo(QrCodeEditorBase)
