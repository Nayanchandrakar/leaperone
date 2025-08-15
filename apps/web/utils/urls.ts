import { clientEnv } from "@myleaper/env/client"

export const URLS = {
  SERVER: `${clientEnv.NEXT_PUBLIC_SERVER_URL}/api/trpc`,
} as const
