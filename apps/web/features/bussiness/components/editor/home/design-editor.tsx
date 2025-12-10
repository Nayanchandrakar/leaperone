import { memo, useRef } from "react"
import { BackgroundChangeForm } from "@/features/bussiness/components/form/editor/design/background"
import { BackgroundStyleForm } from "@/features/bussiness/components/form/editor/design/background-style"
import { CardLoadingForm } from "@/features/bussiness/components/form/editor/design/card-loading"
import { ColorChangeForm } from "@/features/bussiness/components/form/editor/design/color"
import { CardSettingsForm } from "@/features/bussiness/components/form/editor/design/settings"
import { EditorBlock } from "@/features/bussiness/components/ui/editor-block"
import { useDesignEditorForm } from "@/features/bussiness/hooks/home/use-design-editor-form"

/**
 * DesignEditorForms - Renders all design editor sub-forms
 * Extracted to separate component for better organization and potential memoization
 */
const DesignEditorForms = memo(() => (
  <>
    <BackgroundChangeForm />
    <ColorChangeForm />
    <BackgroundStyleForm />
    <CardLoadingForm />
    <CardSettingsForm />
  </>
))

DesignEditorForms.displayName = "DesignEditorForms"

/**
 * DesignEditor - Main form component for editing design settings
 * Implements SRP by delegating logic to custom hook and sub-components
 * Optimized with React.memo to prevent unnecessary re-renders
 */
function DesignEditorBase() {
  const formRef = useRef<HTMLFormElement>(null)
  const { handleSubmit } = useDesignEditorForm()

  return (
    <form id="design-form" ref={formRef} onSubmit={handleSubmit}>
      <EditorBlock defaultValue="background-image-section">
        <DesignEditorForms />
      </EditorBlock>
    </form>
  )
}

// Memoized export to prevent unnecessary re-renders
export default memo(DesignEditorBase)
