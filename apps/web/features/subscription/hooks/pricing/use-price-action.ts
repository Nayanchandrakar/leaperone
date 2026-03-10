import type { CheckoutSessionSchema } from "@app/zod/types"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { usePricingIntervalStore } from "@/features/subscription/hooks/pricing/use-pricing-interval-store"
import { useTeamPricingStore } from "@/features/subscription/hooks/pricing/use-team-pricing-store"
import { billingPortalMutation, subscriptionUpgradeMutation } from "@/lib/api"

export function usePriceAction(isActive: boolean) {
  const router = useRouter()
  const planInterval = usePricingIntervalStore((state) => state.planInterval)
  const teamPricing = useTeamPricingStore((state) => state.teamPricing)

  const mutation = useMutation({
    mutationFn: async (json: CheckoutSessionSchema) => {
      const mutationFn = isActive ? billingPortalMutation : subscriptionUpgradeMutation
      const { data } = await mutationFn(json)
      return data
    },
    onSuccess: ({ url }) => router.push(url!),
    onError: ({ message }) => toast.error(message),
  })

  const trigger = () => {
    if (!teamPricing || !planInterval) return
    mutation.mutate({ seats: teamPricing.seat, priceId: planInterval.stripeId })
  }

  return {
    trigger,
    isPending: mutation.isPending,
  }
}
