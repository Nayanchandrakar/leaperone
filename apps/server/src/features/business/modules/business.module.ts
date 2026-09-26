import { BusinessController } from "@/features/business/controller/business.controller"
import { BusinessService } from "@/features/business/service/business.service"

const businessService = new BusinessService()
const businessController = new BusinessController(businessService)

export { businessController, businessService }
