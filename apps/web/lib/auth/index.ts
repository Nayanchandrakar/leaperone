import { CLIENT_ENV } from "@myleaper/env/client"
import { inferAdditionalFields } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { toast } from "sonner"

export const {
  signUp,
  signIn,
  signOut,
  useSession,
  requestPasswordReset,
  $Infer,
} = createAuthClient({
  baseURL: CLIENT_ENV.NEXT_PUBLIC_SERVER_URL,
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

  fetchOptions: {
    onError: ({ error }) => {
      toast.error(error.message)
    },
  },
})
