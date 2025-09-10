import { SubscriptionRepository } from "@app/database/repository/subscription"
import { Stripe } from "../../subscription/lib/stripe"
import { WebhookController } from "./webhook.controller"
import { WebhookService } from "./webhook.service"

const stripe = Stripe.init()
const subscriptionRepository = SubscriptionRepository.init()
const webhookService = WebhookService.init(subscriptionRepository, stripe)
const webhookController = WebhookController.init(webhookService)

export { webhookController, webhookService }
