import { ENV } from "@app/env/server"
import { cors } from "hono/cors"

export const corsConfig = cors({
  maxAge: 600,
  credentials: true,
  origin: [ENV.FRONTEND_URL],
  exposeHeaders: ["Content-Length"],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
})
