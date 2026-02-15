import { cn } from "@app/ui/lib/utils"
import Link from "next/link"

interface AuthRedirectProps {
  text: string
  href: string
  className?: string
  linkText: string
}

export const AuthRedirect = ({ text, linkText, href, className }: AuthRedirectProps) => {
  return (
    <p className={cn("text-center text-sm", className)}>
      {text}&nbsp;
      <Link href={href} className="underline text-primary">
        {linkText}
      </Link>
    </p>
  )
}
