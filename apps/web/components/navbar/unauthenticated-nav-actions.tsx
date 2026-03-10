"use client"

import { buttonVariants } from "@app/ui/components/button"
import Link from "next/link"

export function UnauthenticatedNavActions() {
  return (
    <>
      <Link
        href="/pricing"
        className={buttonVariants({
          size: "sm",
          variant: "green-ghost",
        })}
      >
        Start Free Trial
      </Link>

      <Link
        href="/login"
        className={buttonVariants({
          size: "sm",
          variant: "white-outline",
          className: "font-semibold",
        })}
      >
        Login
      </Link>
    </>
  )
}
