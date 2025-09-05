import { SERVER_ENV } from "@app/env/server"
import { cors } from "hono/cors"
import { csrf } from "hono/csrf"

export const crossOriginRequest = cors({
  maxAge: 600,
  credentials: true,
  origin: [SERVER_ENV.FRONTEND_URL],
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
})

export const csrfProtection = csrf({
  origin: [SERVER_ENV.FRONTEND_URL],
})
