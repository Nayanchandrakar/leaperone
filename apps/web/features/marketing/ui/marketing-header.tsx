import { cn } from "@app/ui/lib/utils"

export const MarketingHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "container flex items-center justify-center flex-col gap-7 py-16 lg:py-20 text-center",
        className,
      )}
      {...props}
    />
  )
}

export const MarketingHeaderTitle = ({
  className,
  ...props
}: React.ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "text-4xl xl:text-5xl font-semibold lg:font-bold tracking-tight xl:tracking-tighter leading-tight xl:leading-[1.1] max-w-4xl",
        className,
      )}
      {...props}
    />
  )
}

export const MarketingHeaderDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn(
        "text-foreground max-w-2xl text-base text-balance sm:text-lg",
        className,
      )}
      {...props}
    />
  )
}
