import { SERVER_ENV } from "@myleaper/env/server"

export function constructEmailVerificationUrl(
  endpoint: string | undefined,
  token: string,
) {
  const callbackUrl = endpoint || "/"
  const verificationUrl = new URL("/verify-email", SERVER_ENV.SERVER_URL)
  verificationUrl.searchParams.set("token", token)
  verificationUrl.searchParams.set("callbackUrl", callbackUrl)

  return verificationUrl
}
