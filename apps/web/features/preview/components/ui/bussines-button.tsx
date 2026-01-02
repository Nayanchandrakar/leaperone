import { cn } from "@app/ui/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

const buttonVariants = cva(
  "flex-center gap-1.5 whitespace-nowrap rounded-full text-sm font-(--font-button-weight) transition-colors text-primary-foreground disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none cursor-pointer bg-(--highlight-color) hover:bg-(--highlight-color)/90",
  {
    variants: {
      size: {
        default: "h-10 px-5",
        icon: "size-11 xs:size-12 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export const BussinessButton = ({
  className,
  size,
  type = "button",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) => {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      type={type}
      data-slot="button"
      className={cn(buttonVariants({ size, className }))}
      {...props}
    />
  )
}
