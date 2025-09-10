export class WebhookService {
  private static instance: WebhookService | null = null

  private constructor() {}

  static init() {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService()
    }

    return WebhookService.instance
  }
}
