import { cn } from "@app/ui/lib/utils"
import type { LinkProps } from "next/link"
import Link from "next/link"

export const QuickActionCard = ({
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & LinkProps) => {
  return (
    <Link
      className={cn(
        "border border-zinc-300 rounded-xl p-6 flex flex-col gap-3 items-center hover:border-primary/80 transition-colors",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export const QuickActionCardLabel = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn(
        "text-muted-foreground text-center font-normal text-sm",
        className,
      )}
      {...props}
    />
  )
}
