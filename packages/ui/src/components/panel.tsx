"use client"

import { cn } from "@app/ui/lib/utils"

export const Panel = ({ className, ...props }: React.ComponentProps<"section">) => {
  return <section className={cn("space-y-3", className)} {...props} />
}

export const PanelItem = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("border rounded-xl overflow-hidden", className)} {...props} />
}

export const PanelTrigger = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "w-full bg-muted p-5 flex items-start sm:items-center gap-2 justify-between cursor-pointer data-[state=true]:border-b",
        className,
      )}
      {...props}
    />
  )
}

export const PanelContent = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className="transition-[max-height] duration-200 ease-in-out overflow-hidden  data-[state=true]:max-h-80 data-[state=false]:max-h-0"
      {...props}
    >
      <div className={cn("p-5", className)}>{children}</div>
    </div>
  )
}
