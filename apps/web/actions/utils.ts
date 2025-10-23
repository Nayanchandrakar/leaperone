import { SESSION_COOKIE_NAME } from "@app/core/constants"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { API } from "@/config/axios"
import type { FullSession } from "@/types"

export async function getSession() {
  try {
    const cookie = (await cookies()).get(SESSION_COOKIE_NAME)
    if (!cookie) return null
    const { data } = await API.get<FullSession>("/auth/get-session", {
      headers: {
        cookie: `${cookie.name}=${cookie.value}`,
      },
    })
    return data
  } catch {
    return null
  }
}

export async function handleAuth({ path, mode }: { path?: string; mode: "require" | "block" }) {
  const session = await getSession()
  if (mode === "require" && !session) redirect(path ?? "/login")
  if (mode === "block" && session) redirect(path ?? "/")
  return session!
}
