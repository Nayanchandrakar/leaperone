import { cn } from "@leapercrm/ui/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        secondary:
          "border-primary border bg-background shadow-xs hover:bg-primary/5 hover:text-primary/90 text-primary",
        destructive:
          "border-destructive border bg-background shadow-xs hover:bg-destructive/5 hover:text-destructive/90 text-destructive",
        outline:
          "border-zinc-300 border bg-background shadow-xs hover:bg-zinc-300/10 hover:text-zinc-600/90 text-zinc-600",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-full px-10 has-[>svg]:px-5",
        xl: "h-12 rounded-full px-20 has-[>svg]:px-4 font-semibold",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
