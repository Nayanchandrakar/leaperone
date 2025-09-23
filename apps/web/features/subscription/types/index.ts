import type { SubscriptionPlan } from "@app/database/types"
import type { LucideIcon } from "lucide-react"
import type { Nullable } from "@/types"

export type PlanDuration = "monthly" | "yearly"
export type PlanPricing = Record<PlanDuration, number>
export type BillingNoteType = Record<PlanDuration, string>

export type PlanInterval = {
  id: string
  title: string
  stripeId: string
  duration: PlanDuration
}

export type TeamPricing = {
  id: string
  seat: number
  label: string
  pricing: PlanPricing
}

export type Plan = {
  id: number
  title: string
  pricing: PlanPricing
  type: SubscriptionPlan
  billingNote: BillingNoteType
  buttonLink: { label: string; href: string }
  feature: { title: string; details: string[] }
  header: { title: string; Icon: LucideIcon }
}

export type SubscriptionInfo = {
  plan: Nullable<SubscriptionPlan>
  seats: Nullable<number>
  priceId: Nullable<string>
}

export type ComparisonPlans = {
  title: string
  type: SubscriptionPlan | undefined
}
