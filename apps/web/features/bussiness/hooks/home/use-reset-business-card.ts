import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

// Hook to reset the business card
export const useResetBusinessCard = () => {
  const template = useContentEditorStore(useShallow((state) => state.template))
  const resetSettings = useQrCodeEditorStore(useShallow((state) => state.resetSettings))
  const resetConfig = useDesignEditorStore(useShallow((state) => state.resetConfig))
  const resetContent = useContentEditorStore(useShallow((state) => state.resetContent))

  return useCallback(() => {
    resetContent()
    resetConfig(template)
    resetSettings()
  }, [resetContent, resetConfig, resetSettings, template])
}
