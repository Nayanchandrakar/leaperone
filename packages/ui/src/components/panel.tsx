import { cn } from "@app/ui/lib/utils"

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
        "w-full bg-muted p-5 flex items-start sm:items-center gap-2 justify-between group-data-[state=open]/panel-item:border-b",
        className,
      )}
      {...props}
    />
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

export const PanelIconButton = ({ className, ...props }: React.ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "size-8 bg-white border  border-gray-300 rounded-full flex-center [&_svg:not([class*='size-'])]:size-5",
        className,
      )}
      {...props}
    />
  )
}
