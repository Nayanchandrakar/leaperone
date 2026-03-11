import { useCallback } from "react"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export function useResetBusinessCard() {
  const template = useContentEditorStore((state) => state.template)
  const resetContent = useContentEditorStore((state) => state.resetContent)
  const resetConfig = useDesignEditorStore((state) => state.resetConfig)
  const resetSettings = useQrCodeEditorStore((state) => state.resetSettings)

  return useCallback(() => {
    resetContent()
    resetConfig(template)
    resetSettings()
  }, [resetContent, resetConfig, resetSettings, template])
}
