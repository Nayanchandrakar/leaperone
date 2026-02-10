"use client"

import { useSession } from "@/features/auth/hooks/session/use-session"

export const DashboardGreeting = () => {
  const { data } = useSession()
  return <h3 className="font-semibold text-xl">👋Hello {data?.user?.name ?? "Guest"}</h3>
}
