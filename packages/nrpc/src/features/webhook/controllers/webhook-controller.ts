import type { WebhookService } from "../services/webhook-service"

export class WebhookController {
  private static instance: WebhookController | null = null
  private webhookService: WebhookService

  private constructor(webhookService: WebhookService) {
    this.webhookService = webhookService
  }

  static init(webhookService: WebhookService) {
    if (!WebhookController.instance) {
      WebhookController.instance = new WebhookController(webhookService)
    }

    return WebhookController.instance
  }
}
