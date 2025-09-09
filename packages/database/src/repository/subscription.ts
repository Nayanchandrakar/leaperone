export class SubscriptionRepository {
  private static instance: SubscriptionRepository | null = null
  private constructor() {}

  static init() {
    if (!SubscriptionRepository.instance) {
      SubscriptionRepository.instance = new SubscriptionRepository()
    }

    return SubscriptionRepository.instance
  }

  async createSubscription() {}
}
