"use client"

import { useMemo } from "react"
import { FooterDescription } from "@/components/footer/footer-description"
import { FooterNavigation } from "@/components/footer/footer-navigation"

export const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), [])

  return (
    <footer className="bg-muted">
      <div className="container">
        <div className="grid grid-cols-2 gap-x-14 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 py-8 sm:py-12">
          <FooterDescription />
          <FooterNavigation />
        </div>

        <div className="flex items-center justify-center border-t border-border p-4">
          <p className="text-foreground text-xs leading-loose sm:text-sm">
            &copy; {currentYear} Leaper CRM. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
