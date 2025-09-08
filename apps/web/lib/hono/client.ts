import { CLIENT_ENV } from "@app/env/web/client"
import type { AppRouter } from "@app/nrpc"
import { hc } from "hono/client"

export const client = hc<AppRouter>(CLIENT_ENV.NEXT_PUBLIC_SERVER_URL, {
  init: {
    credentials: "include",
  },
})
