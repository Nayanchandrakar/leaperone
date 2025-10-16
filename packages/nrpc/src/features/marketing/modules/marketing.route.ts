import { contactUsFormSchema } from "@app/zod/schema/marketing"
import { Hono } from "hono"
import type { HonoEnv } from "../../../types"
import { zValidator } from "../../../utils/zod-validator"
import { marketingController } from "./marketing.module"

const app = new Hono<HonoEnv>()
  .post(
    "/contact-us",
    zValidator("json", contactUsFormSchema),
    marketingController.contactUs,
  )
  .post(
    "/ask-support",
    zValidator("json", contactUsFormSchema),
    marketingController.askSupport,
  )

export default app
