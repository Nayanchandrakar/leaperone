import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const clientEnv = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_SERVER_URL: z.string().default("http://localhost:8080"),
  },
  runtimeEnv: process.env,
})
