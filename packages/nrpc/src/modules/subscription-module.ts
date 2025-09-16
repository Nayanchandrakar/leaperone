import { SubscriptionController } from "../controllers/subscription-controller"
import { SubscriptionService } from "../services/subscription-service"

const subscriptionService = SubscriptionService.init()
const subscriptionController = SubscriptionController.init(subscriptionService)

export { subscriptionController }
