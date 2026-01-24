import { Hono } from "hono"
import type { Bindings } from "@/types/global.types"

const app = new Hono<{ Bindings: Bindings }>()

app.get("/", async (c) => {
  const cf = c.req.raw.cf
  const ip = c.req.header("CF-Connecting-IP")
  const record = {
    ip,
    city: cf.city,
    region: cf.region,
    country: cf.country,
    timezone: cf.timezone,
    latitude: cf.latitude,
    continent: cf.continent,
    longitude: cf.longitude,
    metroCode: cf.metroCode,
    regionCode: cf.regionCode,
    postalCode: cf.postalCode,
    isEuCountry: cf.isEuCountry,
  }
  return c.json({ cf, record })
})

export default app
