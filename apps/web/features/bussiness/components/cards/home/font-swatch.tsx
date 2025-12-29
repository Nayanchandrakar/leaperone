import { cn } from "@app/ui/lib/utils"

export const FontSwatch = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-muted rounded-lg px-5 py-3 transition-colors duration-200 cursor-pointer outline outline-transparent hover:outline-primary outline-offset-2 data-[state=true]:outline-primary",
        className,
      )}
      {...props}
    />
  )
}
