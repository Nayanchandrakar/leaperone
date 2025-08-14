import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Welcome to myleaper",
  description: "Created by myleaper",
}

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>Marketing Layout:{children}</div>
}
