import type { GlobalMiddlewareConfig } from "@rescale/nemo"
import { NextResponse } from "next/server"
import type { AuthResponse } from "@/types/better-types"
import { URLS } from "@/utils/urls"

export const globalMiddlewares = {
  before: [
    async (request, event) => {
      const cookie = request.headers.get("cookie")
      const loginUrl = new URL("/login", request.nextUrl)

      if (!cookie) {
        return NextResponse.redirect(loginUrl)
      }

      try {
        const res = await fetch(URLS.AUTH_SERVER, { headers: { cookie } })
        const data: AuthResponse = await res.json()

        event.storage.set("session", data)
        return NextResponse.next()
      } catch {
        const response = NextResponse.redirect(loginUrl)
        response.cookies.delete("cookie")
        return response
      }
    },
  ],
} satisfies GlobalMiddlewareConfig
