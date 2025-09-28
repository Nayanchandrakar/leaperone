import type { WebhookService } from "../services/webhook-service"

export class WebhookController {
  private static instance: WebhookController | null = null

  private constructor(private readonly webhookService: WebhookService) {}

  static init(webhookService: WebhookService) {
    if (!WebhookController.instance) {
      WebhookController.instance = new WebhookController(webhookService)
    }

    return WebhookController.instance
  }
}
