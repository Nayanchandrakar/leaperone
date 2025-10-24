import { SubscriptionController } from "@/features/subscription/controllers/subscription.controller"
import { SubscriptionService } from "@/features/subscription/services/subscription.service"

export const subscriptionService = new SubscriptionService()
export const subscriptionController = new SubscriptionController(subscriptionService)
