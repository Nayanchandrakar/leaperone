import { SERVER_ENV } from "@app/env/server"
import { cors } from "hono/cors"

export const crossOriginRequest = cors({
  maxAge: 600,
  credentials: true,
  origin: [SERVER_ENV.FRONTEND_URL],
  allowHeaders: ["Content-Type", "Authorization", "x-is-superjson"],
  allowMethods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length", "x-is-superjson"],
})
