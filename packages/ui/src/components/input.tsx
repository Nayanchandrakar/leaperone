import { cn } from "@app/ui/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex  w-full min-w-0 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-transparent border border-input focus-visible:border-zinc-300",
        gray: "bg-muted border border-zinc-100 focus-visible:border-zinc-200",
      },
      size: {
        default: "h-9 rounded-md px-3 py-1 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Input({
  className,
  type,
  variant,
  size,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className, size }))}
      {...props}
    />
  )
}

export { Input, inputVariants }
