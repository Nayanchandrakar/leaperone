import { cn } from "@app/ui/lib/utils"
import type * as React from "react"

export const Empty = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "min-h-[calc(100vh-128px)] flex-center relative before:absolute before:content-[''] before:size-full before:bg-radial before:from-[#BCFFA359] before:from-40% before:to-80% before:sm:to-70% before:-z-1",
        className,
      )}
      {...props}
    />
  )
}

export const EmptyContent = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("max-w-lg flex items-center flex-col gap-6.5", className)} {...props} />
}

export const EmptyHeading = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("space-y-3 text-center", className)} {...props} />
}

export const EmptyTitle = ({ className, ...props }: React.ComponentProps<"h2">) => {
  return <h2 className={cn("text-3xl font-semibold", className)} {...props} />
}

export const EmptyDescription = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn("px-8 sm:px-12 text-base font-normal text-muted-foreground", className)}
      {...props}
    />
  )
}

export const EmptyActions = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("w-full flex flex-col gap-3 px-8 sm:px-12", className)} {...props} />
}
