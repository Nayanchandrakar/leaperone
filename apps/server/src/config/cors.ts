import { cors } from "hono/cors"

export const crossOriginRequest = cors({
  origin: ["http://localhost:3000"],
  credentials: true,
  allowMethods: ["GET", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
})
