import { cn } from "@app/ui/lib/utils"

export const QuoteText = ({ className, ...props }: React.ComponentProps<"span">) => {
  return (
    <span
      className={cn(
        "relative before:content-[''] before:absolute before:size-14 before:bg-[url('/assets/svg/open-mark.svg')] before:bg-no-repeat before:-top-8 before:-left-16 before:bg-contain before:bg-center",
        className,
      )}
      {...props}
    />
  )
}
