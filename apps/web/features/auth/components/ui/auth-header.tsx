import { cn } from "@app/ui/lib/utils"

export const AuthHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex flex-col items-center gap-3 text-center", className)}
      {...props}
    />
  )
}

export const AuthTitle = ({
  className,
  ...props
}: React.ComponentProps<"h1">) => {
  return <h1 className={cn("text-3xl font-bold", className)} {...props} />
}

export const AuthDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn("text-muted-foreground text-sm font-normal", className)}
      {...props}
    />
  )
}
