import { MarketingController } from "./marketing.controller"
import { MarketingService } from "./marketing.service"

const marketingService = MarketingService.init()
const marketingController = MarketingController.init(marketingService)

export { marketingService, marketingController }
