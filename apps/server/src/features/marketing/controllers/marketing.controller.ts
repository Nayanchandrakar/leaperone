import { contactUsFormSchema } from "@app/zod/schema/marketing"
import { MSG } from "@/constants/message"
import type { MarketingService } from "@/features/marketing/services/marketing.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { zodValidator } from "@/middlewares/validation.middleware"
import type { AskSupportContext, ContactUsContext } from "@/types/marketing.types"

export class MarketingController extends HttpController {
  constructor(private readonly marketingService: MarketingService) {
    super("/marketing")
  }

  protected override initializeRoutes(): void {
    this.router.post("/contact-us", zodValidator("json", contactUsFormSchema), this.contactUs)
    this.router.post("/ask-support", zodValidator("json", contactUsFormSchema), this.askSupport)
  }

  contactUs = async (c: ContactUsContext) => {
    await this.marketingService.contactUs(c)
    return c.json({ message: MSG.CONTACTUS.SUBMIT_SUCCESS })
  }

  askSupport = async (c: AskSupportContext) => {
    await this.marketingService.askSupport(c)
    return c.json({ message: MSG.SUPPORT.SUBMIT_SUCCESS })
  }
}
