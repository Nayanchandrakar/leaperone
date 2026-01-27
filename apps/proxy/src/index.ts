import { neon } from "@neondatabase/serverless"
import { Hono } from "hono"
import { generateCookie, getCookie } from "hono/cookie"
import { poweredBy } from "hono/powered-by"
import { nanoid } from "nanoid"
import { ClickCache } from "@/cache/click.cache"
import { LinkCache } from "@/cache/link.cache"
import { getCacheClient } from "@/config/cache"
import { createAnalytics } from "@/database/repositories/analytics"
import { getBusinessCardByIdentifier } from "@/database/repositories/business-card"
import { BotPage } from "@/html/bot-page"
import type { Bindings } from "@/types/global.types"
import { detectBot } from "@/utils/bot-detection"
import { generateDeviceFingerprint } from "@/utils/hash"
import { getClientIp } from "@/utils/ip"
import { parseGeoLocation } from "@/utils/parse-geo"
import { parseUA } from "@/utils/parse-ua"

const proxy = new Hono<{ Bindings: Bindings }>()

proxy.use(poweredBy({ serverName: "Leaperone" }))

proxy.get("/:identifier", async (c) => {
  const identifier = c.req.param("identifier")

  const redis = getCacheClient(c.env)
  const sql = neon(c.env.DATABASE_URL)
  const linkCache = new LinkCache(redis)
  const clickCache = new ClickCache(redis)

  let cachedLink = await linkCache.get(identifier)

  if (!cachedLink) {
    cachedLink = await getBusinessCardByIdentifier(sql, identifier)
    if (!cachedLink) {
      c.res.headers.set("X-Robots-Tag", "googlebot: noindex")
      return c.redirect("https://dev.leaperone.com/not-found")
    }
    c.executionCtx.waitUntil(linkCache.set(identifier, cachedLink))
  }

  const ip = getClientIp(c)?.trim()
  const ua = c.req.header("User-Agent")?.trim()

  if (!ip || !ua || detectBot(ua, ip)) {
    c.res.headers.set("X-Robots-Tag", "googlebot: noindex")
    return c.html(BotPage, 200, {
      "X-Robots-Tag": "googlebot: noindex",
    })
  }

  const cookieName = `leaper_id_${identifier}`
  let clickId = getCookie(c, cookieName)
  const identityHash = await generateDeviceFingerprint(ip, ua)

  let clickCacheResult = null

  if (!clickId) {
    clickCacheResult = await clickCache.get(identifier, identityHash)
    clickId = clickCacheResult || nanoid(16)
  }

  c.res.headers.set(
    "Set-Cookie",
    generateCookie(cookieName, clickId, {
      maxAge: 3600,
      sameSite: "lax",
      path: `/${identifier}`,
    }),
  )

  const redirectUrl = `${c.env.FRONTEND_URL}/${cachedLink.businessCardId}`

  // Dont track clicks for HEAD requests
  if (c.req.method === "HEAD") {
    return c.redirect(redirectUrl)
  }

  c.executionCtx.waitUntil(
    (async () => {
      // Double check cache after setting cookieId
      if (!clickCacheResult && clickId) {
        clickCacheResult = await clickCache.get(identifier, identityHash)
      }

      // if (clickCacheResult) {
      //   return null
      // }

      // Cloudflare properties
      const cf = c.req.raw.cf

      const clickRecord = {
        ip: !cf.isEUCountry ? ip : null, // Only store IP if not in EU countries
        userId: cachedLink.userId,
        workspaceId: cachedLink.workspaceId,
        businessCardId: cachedLink.businessCardId,
        ...parseUA(ua),
        ...parseGeoLocation(cf),
        clickedAt: new Date(),
      }

      console.info("[Click Recorded]", clickRecord, cachedLink)

      await createAnalytics(sql, clickRecord)

      await clickCache.set(identifier, identityHash, clickId)
    })(),
  )

  return c.redirect(redirectUrl)
})

export default proxy
