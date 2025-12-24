import { cn } from "@app/ui/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 text-primary-foreground",
        destructive:
          "bg-none hover:bg-destructive/5 text-destructive hover:text-destructive/90 border border-destructive",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        "green-ghost": "bg-white hover:bg-white/90 text-primary hover:text-primary/90",
        "white-outline": "bg-none text-white hover:text-white/90 border border-white",
        "green-outline":
          "bg-none hover:bg-primary/5 text-primary hover:text-primary/90 border border-primary",
        "gray-outline":
          "bg-neon hover:bg-zinc-50 text-muted-foreground hover:text-muted-foreground/90 border border-border",
      },
      size: {
        default: "h-9 px-5 py-2",
        sm: "h-8 rounded-full gap-1.5 px-6",
        lg: "h-10 rounded-full px-10",
        xl: "h-12 rounded-full font-semibold",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
        "icon-xl": "size-12",
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
  type = "button",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
