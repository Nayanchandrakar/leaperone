import { cn } from "@app/ui/lib/utils"

export const AssetPromptAction = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex items-center justify-center border-2 border-dashed text-primary text-sm cursor-pointer hover:border-primary/80 transition-colors rounded-2xl p-16 flex-col w-fit gap-3 data-[dragging=true]:border-primary/80",
      className,
    )}
    {...props}
  />
)

export const AssetPromptTitle = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span className="font-medium text-lg  text-muted-foreground" {...props} />
)

export const AssetPromptDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p className="text-sm font-normal text-zinc-500 max-w-xs text-center" {...props} />
)
