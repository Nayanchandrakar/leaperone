import { useEffect, useMemo } from "react"
import { useShallow } from "zustand/react/shallow"
import { PLAN_INTERVALS } from "@/features/subscription/constants/pricing/plan-durations"
import { usePricingStore } from "@/features/subscription/hooks/pricing/use-pricing-store"

export const useSubscriptionPlan = (priceId: string | null) => {
  const { planInterval, setPlan, setPlanIntervalById } = usePricingStore(
    useShallow((state) => ({
      setPlan: state.setPlan,
      planInterval: state.planInterval,
      setPlanIntervalById: state.setPlanIntervalById,
    })),
  )

  const plan = useMemo(
    () => PLAN_INTERVALS.find((i) => i.stripeId === priceId),
    [priceId],
  )

  useEffect(() => {
    if (plan) setPlan(plan!)
  }, [plan, setPlan])

  return {
    planInterval,
    setPlanIntervalById,
  }
}
