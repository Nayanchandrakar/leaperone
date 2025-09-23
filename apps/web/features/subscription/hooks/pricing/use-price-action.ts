import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { usePricingIntervalStore } from "@/features/subscription/hooks/pricing/use-pricing-interval-store"
import { useTeamPricingStore } from "@/features/subscription/hooks/pricing/use-team-pricing-store"
import { client } from "@/lib/hono/client"
import type { SubscriptionUpgradeRequest } from "@/types"
import { ResponseHandler } from "@/utils/response-handler"

export const usePriceAction = (isActive: boolean) => {
  const router = useRouter()
  const planInterval = usePricingIntervalStore((state) => state.planInterval)
  const teamPricing = useTeamPricingStore((state) => state.teamPricing)

  const mutation = useMutation({
    mutationFn: async (json: SubscriptionUpgradeRequest) => {
      const endpoint = isActive ? "billing-portal" : "upgrade"
      const res = await client.api.subscription[endpoint].$post({ json })
      const data = await res.json()

      if (!res.ok) throw ResponseHandler.error(data)
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
