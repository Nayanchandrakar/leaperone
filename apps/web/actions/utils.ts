import { SESSION_COOKIE_NAME } from "@app/core/constants"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { client } from "@/lib/hono/client"

export async function getSession() {
  try {
    const cookie = (await cookies()).get(SESSION_COOKIE_NAME)
    if (!cookie) return null

    const response = await client.api.auth["get-session"].$get(undefined, {
      headers: {
        cookie: `${cookie.name}=${cookie.value}`,
      },
    })

    if (!response.ok) return null
    return await response.json()
  } catch {
    return null
  }
}

export async function handleAuth({
  path,
  mode,
}: {
  path?: string
  mode: "require" | "block"
}) {
  const session = await getSession()
  if (mode === "require" && !session) redirect(path ?? "/login")
  if (mode === "block" && session) redirect(path ?? "/")
  return session!
}
