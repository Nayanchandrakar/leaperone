import { ENV } from "@app/env/server"

export const TRIAL_PERIOD_DAYS = 7

export const PLANS = {
  ANNUAL: ENV.STRIPE_ANNUAL_PRICE_ID,
  MONTHLY: ENV.STRIPE_MONTHLY_PRICE_ID,
}
