"use client"

import { buttonVariants } from "@app/ui/components/button"
import Link from "next/link"
import { Fragment } from "react"

export const UnauthenticatedNavActions = () => {
  return (
    <Fragment>
      <Link
        href="/pricing"
        className={buttonVariants({
          size: "sm",
          variant: "secondary",
        })}
      >
        Start Free Trial
      </Link>

      <Link
        href="/login"
        className={buttonVariants({
          size: "sm",
          variant: "outline",
          className: "font-semibold",
        })}
      >
        Login
      </Link>
    </Fragment>
  )
}
