import type { Metadata } from "next"
import { AuthLayout } from "@/features/auth/components/layouts/auth-layout"

export const metadata: Metadata = {
  title: "Welcome to myleaper",
  description: "Created by myleaper",
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return <AuthLayout>{children}</AuthLayout>
}
