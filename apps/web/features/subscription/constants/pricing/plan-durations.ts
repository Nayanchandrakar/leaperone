import { CLIENT_ENV } from "@app/env/web/client"
import type { PlanInterval } from "@/features/subscription/types"

export const PLAN_INTERVALS: PlanInterval[] = [
  {
    id: "d92e4a81c7f54b3f",
    title: "monthly",
    duration: "monthly",
    stripeId: CLIENT_ENV.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID,
  },
  {
    id: "a7f3c9d1e2b64f0a",
    title: "yearly",
    duration: "yearly",
    stripeId: CLIENT_ENV.NEXT_PUBLIC_STRIPE_ANNUAL_PRICE_ID,
  },
]
