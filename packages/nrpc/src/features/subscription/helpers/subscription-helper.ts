import { PLANS } from "../constants"
import type { PlansKey } from "../types/subscription"

export function getPlanDurationByPriceId(priceId: string): PlansKey | null {
  for (const [key, value] of Object.entries(PLANS)) {
    if (value === priceId) return key as PlansKey
  }
  return null
}

export function getPlanFromQuantity(seats: number) {
  return Number(seats) > 1 ? "team" : "individual"
}
