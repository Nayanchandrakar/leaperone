import { WebhookController } from "./webhook.controller"
import { WebhookService } from "./webhook.service"

const webhookService = WebhookService.init()
const webhookController = WebhookController.init(webhookService)

export { webhookController, webhookService }
