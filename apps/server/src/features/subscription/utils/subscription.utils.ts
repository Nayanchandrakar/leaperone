import { PLANS } from "@/features/subscription/constants/subscription.constants"
import type { PlansKey } from "@/types/subscription.types"

export class SubscriptionUtils {
  private constructor() {}

  static getPlanDurationByPriceId(priceId: string) {
    for (const [key, value] of Object.entries(PLANS)) {
      if (value === priceId) return key as PlansKey
    }
    return null
  }

  static getPlanFromQuantity(seats: number) {
    return Number(seats) > 1 ? "team" : "individual"
  }
}
