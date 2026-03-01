import { useShallow } from "zustand/react/shallow"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export const useEditorState = () => {
  const { content, template } = useContentEditorStore(
    useShallow((state) => ({
      template: state.template,
      content: state.sections,
    })),
  )

  const design = useDesignEditorStore((state) => state.config)
  const qrCode = useQrCodeEditorStore((state) => state.settings)

  return { content, template, design, qrCode }
}
