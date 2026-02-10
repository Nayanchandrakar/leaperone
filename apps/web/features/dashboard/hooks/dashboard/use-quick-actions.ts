import { useCallback } from "react"
import { useBusinessCards } from "@/features/dashboard/hooks/dashboard/use-business-cards"
import { usePermission } from "@/features/dashboard/hooks/dashboard/use-permission"
import { useShareBusinessCard } from "@/features/dashboard/hooks/dashboard/use-share-business-card"

export const useQuickActions = () => {
  const { openDialog } = useShareBusinessCard()

  const {
    isError: permError,
    isPending: permPending,
    data: permData,
  } = usePermission("invite:members")

  const { data: card, isPending: cardPending, isError: cardError } = useBusinessCards()

  const handleShareBusinessCard = useCallback(() => {
    if (cardPending || cardError || !card?.card) return

    openDialog({
      qrCodeOptions: card.card.qrCode,
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
