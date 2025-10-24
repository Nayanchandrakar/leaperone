import { ENV } from "@app/env/server"
import { csrf } from "hono/csrf"

export const csrfConfig = csrf({
  origin: [ENV.FRONTEND_URL],
})
