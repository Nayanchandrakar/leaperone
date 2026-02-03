import { SESSION_COOKIE_NAME } from "@app/core/constants"
import { cookies } from "next/headers"
import { fetchSession } from "@/lib/api"

export async function getSession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)

    if (!sessionCookie) return null

    const { data } = await fetchSession({
      headers: {
        cookie: `${sessionCookie.name}=${sessionCookie.value}`,
      },
    })

    return data
  } catch {
    return null
  }
}
