import { ENV } from "@app/env/server"
import Stripe from "stripe"

export const stripe = new Stripe(ENV.STRIPE_SECRET_KEY, {
  typescript: true,
  apiVersion: "2025-08-27.basil",
})
