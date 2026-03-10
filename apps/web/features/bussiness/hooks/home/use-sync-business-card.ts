import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { useDesignEditorStore } from "@/features/bussiness/stores/use-design-editor-store"
import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"
import { getBusinessCardQueryOptions } from "@/features/bussiness/utils"

/**
 * Synchronize the business card state
 * with the Zustand stores, using React best practices.
 */
export function useSyncBusinessCard() {
  const searchParams = useSearchParams()
  const withCard = !!searchParams.get("edit")

  // Fetch the business card data
  const { data } = useQuery(getBusinessCardQueryOptions(withCard, { withCard }))

  // Set the business card data in the stores
  const setAllConfig = useDesignEditorStore((state) => state.setAllConfig)
  const setAllContent = useContentEditorStore((state) => state.setAllContent)
  const setAllSettings = useQrCodeEditorStore((state) => state.setAllSettings)

  useEffect(() => {
    if (
      withCard &&
      data?.card?.design &&
      data?.card?.qrCode &&
      data?.card?.content &&
      data?.card?.template
    ) {
      setAllContent(data.card.content, data.card.template)
      setAllConfig(data.card.design)
      setAllSettings(data.card.qrCode)
    }
  }, [withCard, data, setAllContent, setAllConfig, setAllSettings])
}
