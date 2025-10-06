import type { Metadata } from "next"
import { Fragment } from "react"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { CornerMesh } from "@/components/shared/mesh"

export const metadata: Metadata = {
  title: "leaperone marketing",
  description: "Created by leaperone",
}

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
      <CornerMesh />
    </Fragment>
  )
}
