import { createContact } from "@app/database/repository/contact-us"
import { createSupport } from "@app/database/repository/support"
import type { AskSupportContext, ContactUsContext } from "@/types/marketing.types"

export class MarketingService {
  async contactUs(c: ContactUsContext) {
    const values = c.req.valid("json")
    await createContact(values)
  }

  async askSupport(c: AskSupportContext) {
    const values = c.req.valid("json")
    await createSupport(values)
  }
}
