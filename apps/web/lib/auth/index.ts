import { clientEnv } from "@myleaper/env/client"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_BACKEND_URL,
})
