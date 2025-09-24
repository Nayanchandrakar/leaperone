import { contactUsFormSchema } from "@app/zod/schema/marketing"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import type { HonoEnv } from "../../../types"

const app = new Hono<HonoEnv>().post(
  "/contact-us",
  zValidator("json", contactUsFormSchema),
)

export default app
