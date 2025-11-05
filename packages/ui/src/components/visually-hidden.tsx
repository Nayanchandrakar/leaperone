import { cn } from "@app/ui/lib/utils"
import { VisuallyHidden as VisuallyHiddenPrimitive } from "@radix-ui/react-visually-hidden"

export const VisuallyHidden = ({
  className,
  ...props
}: React.ComponentProps<typeof VisuallyHiddenPrimitive>) => {
  return <VisuallyHiddenPrimitive className={cn(className)} {...props} />
}
