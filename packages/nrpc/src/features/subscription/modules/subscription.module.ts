import { SubscriptionRepository } from "@app/database/repository/subscription"
import { Stripe } from "../lib/stripe"
import { SubscriptionController } from "./subscription.controller"
import { SubscriptionService } from "./subscription.service"

const stripe = Stripe.init()
const subscriptionRepository = SubscriptionRepository.init()
const subscriptionService = SubscriptionService.init(
  subscriptionRepository,
  stripe,
)
const subscriptionController = SubscriptionController.init(subscriptionService)

export { subscriptionController }
