import { cookies } from "next/headers"
import { SESSION_COOKIE_NAME } from "@/features/auth/constants"
import { client } from "@/lib/hono/client"

export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!sessionCookie) return null

  const res = await client.api.auth["get-session"].$get(undefined, {
    headers: { cookie: `${sessionCookie.name}=${sessionCookie.value}` },
  })

  if (!res.ok) return null

  return await res.json()
}
