import { BussinessController } from "@/features/bussiness/controller/bussiness.controller"
import { BussinessService } from "@/features/bussiness/service/bussiness.service"

const bussinessService = new BussinessService()
const bussinessController = new BussinessController(bussinessService)

export { bussinessService, bussinessController }
