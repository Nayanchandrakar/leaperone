import { cn } from "@app/ui/lib/utils"

export function AuthHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col items-center gap-3 text-center", className)} {...props} />
  )
}

export function AuthTitle({ className, ...props }: React.ComponentProps<"h1">) {
  return <h1 className={cn("text-3xl font-bold", className)} {...props} />
}

export function AuthDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-muted-foreground text-sm font-normal", className)} {...props} />
}
