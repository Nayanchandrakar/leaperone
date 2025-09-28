import { cn } from "@app/ui/lib/utils"
import { Container } from "@/components/shared/container"

export const MarketingIntro = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <Container
      className={cn(
        "space-y-8 mt-24 md:mt-28 lg:mt-36 mx-auto max-w-4xl flex items-center flex-col",
        className,
      )}
      {...props}
    />
  )
}

export const MarketingTitle = ({
  className,
  ...props
}: React.ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "font-bold md:font-semibold text-4xl lg:text-5xl text-center  leading-tight",
        className,
      )}
      {...props}
    />
  )
}

export const MarketingDescription = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn(
        "text-base md:text-lg font-normal text-muted-foreground text-center mx-auto max-w-2xl",
        className,
      )}
      {...props}
    />
  )
}
