import { createContact } from "@app/database/repository/contact-us"
import { MSG } from "../../../constants/message"
import type { ContactUsController } from "../types/marketing"

export class MarketingService {
  private static instance: MarketingService | null = null
  private constructor() {}

  static init() {
    if (!MarketingService.instance) {
      MarketingService.instance = new MarketingService()
    }

    return MarketingService.instance
  }

  async contactUs(c: ContactUsController) {
    const values = c.req.valid("json")
    await createContact(values)
    return c.json({ message: MSG.CONTACTUS.SUBMIT_SUCCESS })
  }
}
