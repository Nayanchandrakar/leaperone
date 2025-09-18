import type { PlanInterval } from "@/features/subscription/types"

export const PLAN_DURATIONS: {
  id: PlanInterval
  title: PlanInterval
}[] = [
  {
    id: "monthly",
    title: "monthly",
  },
  {
    id: "yearly",
    title: "yearly",
  },
]
