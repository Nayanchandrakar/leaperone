import { cn } from "@myleaper/ui/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { LucideIcon } from "lucide-react"

const statusIconVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors shrink-0 text-white [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        success: "bg-primary",
        error: "bg-destructive",
      },
      size: {
        sm: "size-6 [&_svg:not([class*='size-'])]:size-3.5",
        md: "size-8 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "success",
      size: "sm",
    },
  },
)

interface StatusIconProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof statusIconVariants> {
  Icon: LucideIcon
  iconClassName?: string
}

export const StatusIcon = ({
  Icon,
  className,
  variant,
  size,
  iconClassName,
  ...props
}: StatusIconProps) => {
  return (
    <div
      className={cn(statusIconVariants({ variant, size }), className)}
      {...props}
    >
      <Icon className={cn(iconClassName)} strokeWidth={2.5} />
    </div>
  )
}
