import { cn } from "@app/ui/lib/utils"
import Link, { type LinkProps } from "next/link"
import { Icons } from "@/components/shared/icons"

export function Header({ className, ...props }: React.ComponentProps<"header">) {
  return <header className={cn("bg-primary sticky h-16 top-0 z-50", className)} {...props} />
}

export function HeaderContainer({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("container flex items-center justify-between", className)} {...props} />
}

export function HeaderLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Link href="/">
      <Icons.logo className={cn("size-12", className)} {...props} />
      <span className="sr-only">leaperone</span>
    </Link>
  )
}

export function HeaderNavigation({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("lg:flex items-center gap-x-6 hidden", className)} {...props} />
}

export function HeaderNavLink(props: React.ComponentProps<"a"> & LinkProps) {
  return (
    <Link
      className="data-[state=true]:font-semibold text-sm font-medium text-white transition-colors hover:text-white/80"
      {...props}
    />
  )
}
