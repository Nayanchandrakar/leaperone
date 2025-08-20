import { SERVER_ENV } from "@myleaper/env/server"
import { cors } from "hono/cors"

export const crossOriginRequest = cors({
  origin: [SERVER_ENV.BETTER_AUTH_URL],
  credentials: true,
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
})
