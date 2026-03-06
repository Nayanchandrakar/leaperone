import type { ContentSection, DesignEditor, QrCodeEditor, Template } from "@app/types"
import { useIsFetching } from "@tanstack/react-query"
import { useCallback } from "react"
import { useSaveBusinessCard } from "@/features/bussiness/hooks/home/use-save-business-card"
import { useShareBusinessCard } from "@/features/dashboard/hooks/dashboard/use-share-business-card"

type HookProps = {
  template: Template
  design: DesignEditor
  qrCode: QrCodeEditor
  content: ContentSection[]
}

export const useSaveAndShareBusinessCard = ({ content, design, qrCode, template }: HookProps) => {
  const { mutate, isPending } = useSaveBusinessCard()
  const openDialog = useShareBusinessCard((state) => state.openDialog)

  const isFetching = useIsFetching({
    queryKey: ["business-card"],
  })

  const handleSaveAndShare = useCallback(
    (autoDownload = false) => {
      if (Array.isArray(content) && content.length && design && qrCode && template) {
        mutate(
          { content, design, qrCode, template },
          {
            onSuccess({ card }) {
              openDialog({
                qrCode,
                autoDownload,
                identifier: card.identifier,
              })
            },
          },
        )
      }
    },
    [content, design, qrCode, template, mutate, openDialog],
  )

  return { handleSaveAndShare, isPending, isFetching }
}
