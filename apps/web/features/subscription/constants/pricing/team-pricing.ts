import type { TeamPricing } from "@/features/subscription/types"

export const TEAM_PRICING: TeamPricing[] = [
  {
    id: "a1f9b2d8",
    label: "For 2 users",
    seat: 2,
    pricing: { monthly: 14.99, yearly: 11.99 },
  },
  {
    id: "c4e7f3a1",
    label: "For 3–5 users",
    seat: 5,
    pricing: { monthly: 12.99, yearly: 10.99 },
  },
  {
    id: "d9b6e1f4",
    label: "For 6–10 users",
    seat: 10,
    pricing: { monthly: 10.99, yearly: 8.99 },
  },
  {
    id: "f2c8a7e5",
    label: "For 11+ users",
    seat: 12,
    pricing: { monthly: 9.99, yearly: 7.99 },
  },
]
