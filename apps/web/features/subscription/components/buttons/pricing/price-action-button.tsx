"use client"

import { Button } from "@app/ui/components/button"
import { useRouter } from "next/navigation"
import { usePricingIntervalStore } from "@/features/subscription/hooks/pricing/use-pricing-interval-store"
import { useTeamPricingStore } from "@/features/subscription/hooks/pricing/use-team-pricing-store"
import { client } from "@/lib/hono/client"

interface IPriceActionButton {
  subscription: any
}

export const PriceActionButton = ({ subscription }: IPriceActionButton) => {
  const router = useRouter()
  const teamPricing = useTeamPricingStore((state) => state.teamPricing)
  const planInterval = usePricingIntervalStore((state) => state.planInterval)

  console.log(subscription)

  return (
    <Button
      onClick={async () => {
        const res = await client.api.subscription.upgrade.$post({
          json: {
            priceId: planInterval.stripeId,
            seats: teamPricing.seat,
          },
        })

        const data = await res.json()
        router.push(data.url as any)
      }}
      className="w-full font-semibold "
      size="xl"
    >
      Start 7 days Free Trial
    </Button>
  )
}
