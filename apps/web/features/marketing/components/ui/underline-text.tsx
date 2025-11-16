import { cn } from "@app/ui/lib/utils"

export const UnderlineText = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      className={cn(
        "relative before:content-[''] before:absolute before:w-full before:h-12 before:z-[-1] before:bg-[url('/assets/svg/dash.svg')] before:bg-no-repeat before:-bottom-7 before:bg-size-[100%_100%] inline-flex",
        className,
      )}
      {...props}
    />
  )
}
