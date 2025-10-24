import { MarketingController } from "@/features/marketing/controllers/marketing.controller"
import { MarketingService } from "@/features/marketing/services/marketing.service"

const marketingService = new MarketingService()
const marketingController = new MarketingController(marketingService)

export { marketingService, marketingController }
