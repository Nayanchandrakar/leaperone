import type { SubscriptionPlan } from "@app/database/types"
import type { LucideIcon } from "lucide-react"

export type PlanDuration = "monthly" | "yearly"
export type PlanPricing = Record<PlanDuration, number>

export type PlanInterval = {
  id: string
  title: string
  stripeId: string
  duration: PlanDuration
}

export type TeamPricing = {
  id: string
  label: string
  seat: number
  pricing: PlanPricing
}

export type Plan = {
  id: number
  type: SubscriptionPlan
  title: string
  header: {
    title: string
    Icon: LucideIcon
  }
  billingNote: Record<PlanDuration, string>
  pricing: PlanPricing
  buttonLink: {
    label: string
    href: string
  }
  feature: {
    title: string
    details: string[]
  }
}
