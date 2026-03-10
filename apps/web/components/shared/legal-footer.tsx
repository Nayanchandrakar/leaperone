import { Separator } from "@app/ui/components/separator"
import Link from "next/link"

export function LegalFooter() {
  return (
    <footer className="h-16 border-t bg-muted flex-center">
      <div className="container w-fit! h-5! flex items-center gap-4 text-sm text-muted-foreground [&_a]:hover:text-foreground [&_a]:md:block [&_a]:hidden **:data-[slot=separator]:md:block **:data-[slot=separator]:hidden transition-colors">
        <span className="whitespace-nowrap">
          &copy; {new Date().getFullYear()} &mdash; Leaper CRM. All Rights Reserved.
        </span>
        <Separator orientation="vertical" />
        <Link target="_blank" href="/privacy-policy">
          Privacy Policy
        </Link>
        <Separator orientation="vertical" />
        <Link target="_blank" href="/terms-and-conditions">
          Terms and Conditions
        </Link>
      </div>
    </footer>
  )
}
