import { cn } from "@app/ui/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

const textareaVariants = cva(
  "border placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 aria-invalid:border-destructive",

  {
    variants: {
      variant: {
        default: "bg-transparent border-input focus-visible:border-zinc-300",
        gray: "bg-muted border border-zinc-100 focus-visible:border-zinc-200",
      },
      size: {
        default: "min-h-16 rounded-md px-3 py-2 text-base field-sizing-content",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Textarea({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Textarea }
