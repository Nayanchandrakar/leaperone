import { cn } from "@app/ui/lib/utils"
import Link from "next/link"

interface AuthRedirectProps {
  message: string
  linkHref: string
  className?: string
  linkMessage: string
}

export const AuthRedirect = ({ message, linkMessage, linkHref, className }: AuthRedirectProps) => {
  return (
    <p className={cn("text-center text-sm", className)}>
      {message}&nbsp;
      <Link tabIndex={-1} href={linkHref} className="underline text-primary">
        {linkMessage}
      </Link>
    </p>
  )
}
