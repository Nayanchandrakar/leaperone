import { cn } from "@app/ui/lib/utils"

export const ChartHeading = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("flex flex-col gap-1 text-start", className)} {...props} />
}

export const ChartTitle = ({ className, ...props }: React.ComponentProps<"h5">) => {
  return <h5 className={cn("text-muted-foreground font-semibold text-xl", className)} {...props} />
}

export const ChartDescription = ({ className, ...props }: React.ComponentProps<"p">) => {
  return <p className={cn("text-muted-foreground font-normal text-sm", className)} {...props} />
}
