import { ENV } from "@app/env/server"

export const PLANS = {
  ANNUAL: ENV.STRIPE_ANNUAL_PRICE_ID,
  MONTHLY: ENV.STRIPE_MONTHLY_PRICE_ID,
}

export const CHECKOUT_STATUSES = ["canceled", "incomplete_expired", "unpaid"]
