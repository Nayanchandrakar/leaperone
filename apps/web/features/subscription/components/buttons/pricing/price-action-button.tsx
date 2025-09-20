"use client"

import { Button } from "@app/ui/components/button"
import { useRouter } from "next/navigation"
import { useShallow } from "zustand/react/shallow"
import { usePricingStore } from "@/features/subscription/hooks/pricing/use-pricing-store"
import { client } from "@/lib/hono/client"

interface IPriceActionButton {
  subscriptionInfo: any
}

export const PriceActionButton = ({ subscriptionInfo }: IPriceActionButton) => {
  const router = useRouter()
  const { pricingTier, planInterval } = usePricingStore(
    useShallow((state) => ({
      pricingTier: state.pricingTier,
      planInterval: state.planInterval,
    })),
  )

  // console.log(planInterval, pricingTier, subscriptionInfo)
  return (
    <Button
      onClick={async () => {
        const res = await client.api.subscription["billing-portal"].$post({
          json: {
            priceId: planInterval.stripeId,
            seats: pricingTier.seat,
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
