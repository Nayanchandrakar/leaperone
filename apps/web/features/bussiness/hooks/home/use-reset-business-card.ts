import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

// Hook to reset the business card
export const useResetBusinessCard = () => {
  const resetDesign = useDesignEditorStore(useShallow((state) => state.reset))
  const resetQrCode = useQrCodeEditorStore(useShallow((state) => state.reset))
  const resetContent = useContentEditorStore(useShallow((state) => state.reset))

  return useCallback(() => {
    resetContent()
    resetDesign()
    resetQrCode()
  }, [resetContent, resetDesign, resetQrCode])
}
