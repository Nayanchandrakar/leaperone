"use client"

import { useMemo } from "react"
import { FooterDescription } from "@/components/footer/footer-description"
import { FooterNavigation } from "@/components/footer/footer-navigation"

export const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="border-t border-border bg-muted">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-14 gap-y-10 px-5 sm:px-6 py-8 sm:py-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 xl:px-0">
          <FooterDescription />
          <FooterNavigation />
        </div>

        <div className="flex items-center justify-center border-t border-border p-6">
          <p className="text-center font-normal text-muted-foreground sm:text-base text-sm">
            &copy; {currentYear} Leaper CRM. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
