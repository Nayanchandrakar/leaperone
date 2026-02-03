import { buttonVariants } from "@app/ui/components/button"
import Link from "next/link"

export const DashboardLinkButton = () => {
  return (
    <Link
      className={buttonVariants({
        size: "sm",
        variant: "white-outline",
        className: "font-semibold",
      })}
      href="/dashboard"
    >
      Dashboard
    </Link>
  )
}
