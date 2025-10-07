import Link from "next/link"

export const DashboardFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="h-14 flex items-center justify-center">
        <nav className="flex items-center justify-center text-sm text-muted-foreground font-normal divide-x divide-border">
          <p className="px-4">
            &copy; {currentYear} Leaper One. All Rights Reserved.
          </p>
          <Link
            className="px-4 hover:text-primary rounded-sm"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="px-4 hover:text-primary"
            href="/terms-and-conditions"
          >
            Terms and Conditions
          </Link>
        </nav>
      </div>
    </footer>
  )
}
