export type SubscriptionActive = {
  active: boolean
  trial: boolean
  seats: number
  plan: string | null
  priceId: string | null
  expiresAt: Date | null
  customerId: string | null
  cancelAtPeriodEnd: boolean
  subscriptionId: string | null
}
