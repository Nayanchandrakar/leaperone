import type {
  AskSupportController,
  ContactUsController,
} from "../types/marketing"
import type { MarketingService } from "./marketing.service"

export class MarketingController {
  private static instance: MarketingController | null = null

  private constructor(private readonly marketingService: MarketingService) {}

  static init(marketingService: MarketingService) {
    if (!MarketingController.instance) {
      MarketingController.instance = new MarketingController(marketingService)
    }

    return MarketingController.instance
  }

  contactUs = async (c: ContactUsController) => {
    return await this.marketingService.contactUs(c)
  }

  askSupport = async (c: AskSupportController) => {
    return await this.marketingService.askSupport(c)
  }
}
