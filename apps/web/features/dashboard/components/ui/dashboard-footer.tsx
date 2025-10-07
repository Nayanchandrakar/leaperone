import Link from "next/link"

export const DashboardFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="w-full p-4">
        <nav className="flex flex-col md:flex-row items-center justify-center text-xs md:text-sm text-muted-foreground font-normal gap-1 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-border text-center">
          <p className="px-0 py-1 md:px-4 md:py-0">
            &copy; {currentYear} Leaper One. All Rights Reserved.
          </p>
          <Link
            className="px-0 py-1 md:px-4 md:py-0 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="px-0 py-1 md:px-4 md:py-0 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            href="/terms-and-conditions"
          >
            Terms and Conditions
          </Link>
        </nav>
      </div>
    </footer>
  )
}
