import { Stripe } from "../lib/stripe"
import { SubscriptionController } from "./subscription.controller"
import { SubscriptionService } from "./subscription.service"

const stripe = Stripe.init()
const subscriptionService = SubscriptionService.init(stripe)
const subscriptionController = SubscriptionController.init(subscriptionService)

export { subscriptionController }
