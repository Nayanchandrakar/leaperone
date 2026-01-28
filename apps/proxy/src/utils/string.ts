import type { Context } from "hono"

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1)
}

export function getTriggerSource(c: Context) {
  return c.req.query("url") === "1" ? "link" : "qr"
}
