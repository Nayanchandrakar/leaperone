import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Welcome to myleaper",
  description: "Created by myleaper",
}

export default function InvitationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div>Invitation Layout:{children}</div>
}
