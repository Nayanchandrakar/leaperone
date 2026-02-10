import { FileSearch, IdCard, ShoppingCart, UserRoundPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { ActionItem } from "@/features/dashboard/components/cards/dashboard/action-item"
import { QuickActionCardSkeleton } from "@/features/dashboard/components/skeletons/dashboard"
import { useQuickActions } from "@/features/dashboard/hooks/dashboard/use-quick-actions"

export const QuickActionsList = () => {
  const router = useRouter()
  const { isLoading, hasError, canInviteMembers, handleShareBusinessCard } = useQuickActions()

  if (isLoading || hasError) return <QuickActionCardSkeleton />

  return (
    <>
      <ActionItem Icon={IdCard} label="Share Business Card" onClick={handleShareBusinessCard} />

      <ActionItem
        Icon={FileSearch}
        label="Check Form Responses"
        onClick={() => router.push("/dashboard/form-responses")}
      />

      {canInviteMembers && (
        <ActionItem
          Icon={UserRoundPlus}
          label="Invite Team Member"
          onClick={() => router.push("/dashboard/teams")}
        />
      )}

      <ActionItem
        Icon={ShoppingCart}
        label="Buy NFC Items"
        onClick={() => router.push("/dashboard/shop-nfc")}
      />
    </>
  )
}
