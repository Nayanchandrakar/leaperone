import { CLICK_CACHE_TTL } from "@app/core/constants"
import { createId } from "@paralleldrive/cuid2"
import { Hono } from "hono"
import { generateCookie, getCookie } from "hono/cookie"
import { poweredBy } from "hono/powered-by"
import { ClickCache } from "@/cache/click.cache"
import { LinkCache } from "@/cache/link.cache"
import { getCacheClient } from "@/config/cache"
import { getDatabaseClient } from "@/config/database"
import { createAnalytics } from "@/database/repositories/analytics"
import { getBusinessCardByIdentifier } from "@/database/repositories/business-card"
import { BotPage } from "@/html/bot-page"
import type { Bindings } from "@/types/global.types"
import { detectBot } from "@/utils/bot-detection"
import { generateDeviceFingerprint } from "@/utils/hash"
import { getClientIp } from "@/utils/ip"
import { parseGeoLocation } from "@/utils/parse-geo"
import { parseUA } from "@/utils/parse-ua"
import { getTriggerSource } from "@/utils/string"

const proxy = new Hono<{ Bindings: Bindings }>()

proxy.use(poweredBy({ serverName: "LeaperOne Proxy Service" }))

proxy.get("/:identifier", async (c) => {
  const identifier = c.req.param("identifier")

  const redis = getCacheClient(c.env)
  const sql = getDatabaseClient(c.env)

  const linkCache = new LinkCache(redis)
  const clickCache = new ClickCache(redis)

  // Fetch business card data from cache or database
  let cachedLink = await linkCache.get(identifier)

  if (!cachedLink) {
    // Cache miss - fetch from database
    cachedLink = await getBusinessCardByIdentifier(sql, identifier)
    if (!cachedLink) {
      // Business card not found - redirect to 404 page
      c.res.headers.set("X-Robots-Tag", "googlebot: noindex")
      return c.redirect("https://dev.leaperone.com/not-found")
    }
    // Cache the result for future requests (runs in background)
    c.executionCtx.waitUntil(linkCache.set(identifier, cachedLink))
  }

  const ip = getClientIp(c)?.trim()
  const ua = c.req.header("User-Agent")?.trim()

  // Bot detection: Show static page to bots/crawlers to avoid tracking them
  if (!ip || !ua || detectBot(ua, ip)) {
    c.res.headers.set("X-Robots-Tag", "googlebot: noindex")
    return c.html(BotPage, 200, {
      "X-Robots-Tag": "googlebot: noindex",
    })
  }

  // Track unique clicks using cookies and device fingerprinting
  // Cookie name is scoped to the specific business card identifier
  const cookieName = `leaper_id_${identifier}`
  let clickId = getCookie(c, cookieName)

  // Generate unique device fingerprint from IP and user agent
  const identityHash = await generateDeviceFingerprint(ip, ua)

  let clickCacheResult = null

  if (!clickId) {
    // No cookie found - check if this device has clicked before using fingerprint
    clickCacheResult = await clickCache.get(identifier, identityHash)
    // Use existing click ID or generate new one
    clickId = clickCacheResult || createId()
  }

  // Set cookie to track this click for future visits
  // Cookie is scoped to this specific business card path
  c.res.headers.set(
    "Set-Cookie",
    generateCookie(cookieName, clickId, {
      sameSite: "lax",
      path: `/${identifier}`,
      maxAge: CLICK_CACHE_TTL,
    }),
  )

  // Construct the final redirect URL to the business card page
  const redirectUrl = `${c.env.FRONTEND_URL}?id=${cachedLink.businessCardId}`

  // HEAD requests are used for link previews - don't track analytics for them
  if (c.req.method === "HEAD") {
    return c.redirect(redirectUrl)
  }

  // Record analytics asynchronously (doesn't block the redirect)
  c.executionCtx.waitUntil(
    (async () => {
      // Double-check cache after setting cookie to avoid race conditions
      if (!clickCacheResult && clickId) {
        clickCacheResult = await clickCache.get(identifier, identityHash)
      }

      // If click is already recorded in cache, skip analytics recording
      // This prevents duplicate analytics for the same device within the cache TTL
      if (clickCacheResult) {
        return null
      }

      // Extract Cloudflare request properties for geolocation data
      const cf = c.req.raw.cf

      // Build analytics record with all tracking data
      const clickRecord = {
        trigger: getTriggerSource(c),
        ip: !cf.isEUCountry ? ip : null, // GDPR compliance: don't store IP for EU users
        ...cachedLink,
        ...parseUA(ua),
        ...parseGeoLocation(cf),
        clickedAt: new Date(),
      }

      // Record analytics and cache the click in parallel
      await Promise.all([
        createAnalytics(sql, clickRecord),
        clickCache.set(identifier, identityHash, clickId), // Cache for 1 hour to prevent duplicates
      ])

      console.info("[Click Recorded]")
    })(),
  )

  return c.redirect(redirectUrl)
})

export default proxy
