import { MarketingController } from "../controllers/marketing-controller"
import { MarketingService } from "../services/marketing-service"

const marketingService = MarketingService.init()
const marketingController = MarketingController.init(marketingService)

export { marketingService, marketingController }
