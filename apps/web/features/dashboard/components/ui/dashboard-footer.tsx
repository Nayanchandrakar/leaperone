import Link from "next/link"

export const DashboardFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="container !h-fit border-t border-border p-4 ">
      <div className=" flex items-center flex-col min-[924px]:flex-row justify-between gap-3 min-[924px]:gap-4 text-xs sm:text-sm text-muted-foreground font-normal">
        <p className="">&copy; {currentYear} Leaper One. All Rights Reserved.</p>

        <div className="flex items-center gap-2.5">
          <Link href="/" className="hover:text-primary">
            Privacy Policy
          </Link>

          <Link href="/" className="hover:text-primary">
            Terms and Conditions
          </Link>
        </div>
      </div>
    </footer>
  )
}
