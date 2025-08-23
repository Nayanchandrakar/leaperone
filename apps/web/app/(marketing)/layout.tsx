import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Welcome to myleaper",
  description: "Created by myleaper",
}

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}
