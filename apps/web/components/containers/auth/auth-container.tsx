import { cn } from "@myleaper/ui/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import type React from "react"

type AuthContainerProps = React.ComponentProps<"section"> & {
  asChild?: boolean
}

export const AuthContainer = ({
  className,
  children,
  asChild = false,
  ...props
}: AuthContainerProps) => {
  const Comp = asChild ? Slot : "section"
  return (
    <Comp className={cn("p-6 sm:sm:p-7 md:p-8", className)} {...props}>
      {children}
    </Comp>
  )
}
