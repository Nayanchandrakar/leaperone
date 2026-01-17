import type { BussinessService } from "@/features/bussiness/service/bussiness.service"
import { HttpController } from "@/features/shared/controllers/http.controller"

export class BussinessController extends HttpController {
  constructor(private readonly bussinessService: BussinessService) {
    super("/bussiness")
    this.initializeRoutes()
  }

  protected override initializeRoutes(): void {}
}
