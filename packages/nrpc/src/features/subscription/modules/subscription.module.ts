import { SubscriptionController } from "./subscription.controller"
import { SubscriptionService } from "./subscription.service"

const subscriptionService = SubscriptionService.init()
const subscriptionController = SubscriptionController.init(subscriptionService)

export { subscriptionController }
