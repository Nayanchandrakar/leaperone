import { cn } from "@app/ui/lib/utils"

export const Iphone = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "h-140 w-full rounded-3xl border-8 border-black relative before:absolute before:content-[''] before:w-15 before:h-5 before:rounded-full before:bg-black before:top-2.5 before:left-1/2 before:-translate-x-1/2 overflow-hidden",
        className,
      )}
      {...props}
    />
  )
}
