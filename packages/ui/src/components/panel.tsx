import { cn } from "@app/ui/lib/utils"
import { ChevronDown } from "lucide-react"

export const Panel = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div data-slot="panel" className={cn("space-y-3", className)} {...props} />
}

export const PanelItem = ({
  open,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  open: boolean
}) => {
  return (
    <div
      data-slot="panel-item"
      data-state={open ? "open" : "closed"}
      className={cn("border rounded-xl overflow-hidden group/panel-item", className)}
      {...props}
    />
  )
}

export const PanelTrigger = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="panel-trigger"
      className={cn(
        "w-full bg-muted p-5 flex items-center gap-2 justify-between group-data-[state=open]/panel-item:border-b",
        className,
      )}
      {...props}
    />
  )
}

export const PanelTitle = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      data-slot="panel-title"
      className={cn("text-base font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

export const PanelSet = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div data-slot="panel-header" className={cn("flex items-center gap-2", className)} {...props} />
  )
}

export const PanelToogle = ({ className, children, ...props }: React.ComponentProps<"button">) => {
  return (
    <button
      type="button"
      className="size-8 bg-white border  border-gray-300 rounded-full flex-center [&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0 [&_svg]:text-muted-foreground"
      {...props}
    >
      {children ?? (
        <ChevronDown className="transition-transform group-data-[state=open]/panel-item:rotate-180" />
      )}
    </button>
  )
}

export const PanelContent = ({ className, children, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className="transition-[max-height] duration-200 ease-in-out overflow-hidden  group-data-[state=open]/panel-item:max-h-80 group-data-[state=closed]/panel-item:max-h-0"
      {...props}
    >
      <div className={cn("p-5", className)}>{children}</div>
    </div>
  )
}
