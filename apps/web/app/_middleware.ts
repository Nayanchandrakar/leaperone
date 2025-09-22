import { SESSION_COOKIE_NAME } from "@app/constants/auth"
import type { GlobalMiddlewareConfig } from "@rescale/nemo"
import { NextResponse } from "next/server"
import { client } from "@/lib/hono/client"

export const globalMiddlewares: GlobalMiddlewareConfig = {
  before: [
    async (request, event) => {
      const cookie = request.cookies.get(SESSION_COOKIE_NAME)

      if (!cookie) {
        event.storage.set("session", null)
        return NextResponse.next()
      }

      // Note: headers and cookies are included by default here
      const res = await client.api.auth["get-session"].$get(undefined, {
        headers: { cookie: `${cookie.name}=${cookie.value}` },
      })

      if (!res.ok) {
        event.storage.set("session", null)
        return NextResponse.next()
      }

      const session = await res.json()
      event.storage.set("session", session)
      return NextResponse.next()
    },
  ],
}
