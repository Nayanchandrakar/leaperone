import { neon } from "@neondatabase/serverless"
import { Hono } from "hono"
import { generateCookie, getCookie } from "hono/cookie"
import { poweredBy } from "hono/powered-by"
import { nanoid } from "nanoid"
import { ClickCache } from "@/cache/click.cache"
import { LinkCache } from "@/cache/link.cache"
import { getCacheClient } from "@/config/cache"
import { getBusinessCardByIdentifier } from "@/database/repositories/business-card"
import { BotPage } from "@/html/bot-page"
import type { Bindings } from "@/types/global.types"
import { detectBot } from "@/utils/bot-detection"
import { getIdentityHash } from "@/utils/get-identity-hash"
import { getClientIp } from "@/utils/ip"
import { parseUA } from "@/utils/parse-user-agent"

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
  const identityHash = await getIdentityHash(ip, ua)

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
      const parsedUA = parseUA(ua)

      // Double check cache after setting cookieId
      if (!clickCacheResult && clickId) {
        clickCacheResult = await clickCache.get(identifier, identityHash)
      }

      // Optionally: Log or monitor data for debugging
      console.info("[Click Recorded]", { identifier, identityHash, clickId, parsedUA, ip })

      await clickCache.set(identifier, identityHash, clickId)
    })(),
  )

  return c.redirect(redirectUrl)
})

export default proxy
