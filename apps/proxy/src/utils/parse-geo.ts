import type { CfProperties } from "@cloudflare/workers-types"

export function parseGeoLocation(cf: CfProperties) {
  const latitude = cf.latitude ? Number.parseFloat(cf.latitude as string) : 37.7695
  const longitude = cf.longitude ? Number.parseFloat(cf.longitude as string) : -122.385

  return {
    latitude,
    longitude,
    city: (cf.city as string) || "Unknown",
    region: (cf.region as string) || "Unknown",
    country: (cf.country as string) || "Unknown",
    continent: (cf.continent as string) || "Unknown",
  }
}
