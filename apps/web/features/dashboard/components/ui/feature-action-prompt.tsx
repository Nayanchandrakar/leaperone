import { cn } from "@app/ui/lib/utils"

export const PromptMessage = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn(
        "text-muted-foreground font-normal text-sm text-center max-w-lg mx-auto my-8",
        className,
      )}
      {...props}
    />
  )
}

export const PromptAction = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center border-2 border-dashed w-full rounded-lg text-primary gap-1.5 text-sm p-8 cursor-pointer hover:border-primary/80 transition-colors",
        className,
      )}
      {...props}
    />
  )
}
