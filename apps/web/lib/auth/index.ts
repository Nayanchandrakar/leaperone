import { clientEnv } from "@myleaper/env/client"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: clientEnv.NEXT_PUBLIC_SERVER_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        username: {
          type: "string",
          required: true,
          input: true,
          unique: true,
        },
      },
    }),
  ],
})
