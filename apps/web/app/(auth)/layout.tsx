import type { Metadata } from "next"
import { AuthLayout } from "@/features/auth/components/layout/auth-layout"

export const metadata: Metadata = {
  title: "Welcome to myleaper",
  description: "Created by myleaper",
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <AuthLayout>{children}</AuthLayout>
}
