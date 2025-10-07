import { cn } from "@app/ui/lib/utils"
import Link, { type LinkProps } from "next/link"
import { Icons } from "@/components/shared/icons"

export const Header = ({
  className,
  ...props
}: React.ComponentProps<"header">) => {
  return (
    <header
      className={cn("bg-primary sticky h-14 top-0 z-50", className)}
      {...props}
    />
  )
}

export const HeaderContainer = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("container flex items-center justify-between", className)}
      {...props}
    />
  )
}

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <Icons.logo className="size-12" />
      <span className="sr-only">leaperone</span>
    </Link>
  )
}

export const HeaderNavigation = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("lg:flex items-center gap-x-6 hidden", className)}
      {...props}
    />
  )
}

export const HeaderNavLink = (props: React.ComponentProps<"a"> & LinkProps) => {
  return (
    <Link
      className="data-[state=true]:font-semibold text-sm font-medium text-white transition-colors hover:text-white/80"
      {...props}
    />
  )
}
