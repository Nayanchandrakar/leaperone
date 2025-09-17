import { WebhookController } from "../controllers/webhook-controller"
import { WebhookService } from "../services/webhook-service"

const webhookService = WebhookService.init()
const webhookController = WebhookController.init(webhookService)

export { webhookController, webhookService }
