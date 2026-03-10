"use client"

import type { SubscriptionPlan } from "@app/database/types"
import { Button } from "@app/ui/components/button"
import { usePriceAction } from "@/features/subscription/hooks/pricing/use-price-action"
import type { SubscriptionInfo } from "@/features/subscription/types"
import { getPriceActionButtonText, hasPurchased } from "@/features/subscription/utils"

interface IPriceActionButton {
  subscription: SubscriptionInfo
  type: SubscriptionPlan
}

export function PriceActionButton({ subscription, type }: IPriceActionButton) {
  const isActive = type === subscription?.plan
  const { trigger, isPending } = usePriceAction(isActive)

  const hasPurchase = hasPurchased(subscription)
  const buttonText = getPriceActionButtonText({ type, isActive, hasPurchase })

  return (
    <Button
      size="xl"
      onClick={trigger}
      disabled={isActive || isPending}
      variant={isActive ? "gray-outline" : undefined}
      className="w-full font-medium disabled:opacity-90"
    >
      {buttonText}
    </Button>
  )
}
