import { useEffect } from "react"
import { usePricingIntervalStore } from "@/features/subscription/hooks/pricing/use-pricing-interval-store"
import { useTeamPricingStore } from "@/features/subscription/hooks/pricing/use-team-pricing-store"
import type { SubscriptionInfo } from "@/features/subscription/types"
import { deriveSubscriptionState } from "@/features/subscription/utils"

export function useSubscriptionSync(subscription: SubscriptionInfo) {
  const setTeamPricing = useTeamPricingStore((state) => state.setTeamPricing)
  const setPlanIntervalById = usePricingIntervalStore((state) => state.setPlanIntervalById)

  useEffect(() => {
    const data = subscription && deriveSubscriptionState(subscription)
    if (data) {
      setPlanIntervalById(data.planInterval.id)
      setTeamPricing(data.teamPricing!)
    }
  }, [subscription, setPlanIntervalById, setTeamPricing])
}
