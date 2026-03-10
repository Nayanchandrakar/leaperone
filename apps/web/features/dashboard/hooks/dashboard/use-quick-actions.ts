import { useQuery } from "@tanstack/react-query"
import { useCallback } from "react"
import { getBusinessCardQueryOptions } from "@/features/bussiness/utils"
import { usePermission } from "@/features/dashboard/hooks/dashboard/use-permission"
import { useShareBusinessCard } from "@/features/dashboard/hooks/dashboard/use-share-business-card"

export function useQuickActions() {
  const { openDialog } = useShareBusinessCard()

  const {
    isError: permError,
    isPending: permPending,
    data: permData,
  } = usePermission("invite:members")

  const {
    data: card,
    isPending: cardPending,
    isError: cardError,
  } = useQuery(getBusinessCardQueryOptions())

  const handleShareBusinessCard = useCallback(() => {
    if (cardPending || cardError || !card?.card) return

    openDialog({
      qrCode: card.card.qrCode,
      identifier: card.card.identifier,
    })
  }, [cardPending, cardError, card, openDialog])

  const isLoading = Boolean(permPending || cardPending)
  const hasError = Boolean(permError || cardError)
  const canInviteMembers = Boolean(permData?.permission)

  return {
    isLoading,
    hasError,
    canInviteMembers,
    handleShareBusinessCard,
  }
}
