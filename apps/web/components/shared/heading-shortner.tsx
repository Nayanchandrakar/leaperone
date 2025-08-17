import { cn } from "@myleaper/ui/lib/utils"

type HeadingShortnerProps = {
  className?: string
  titleClassName?: string
  desClassName?: string
  title: string
  description?: string
}

export const HeadingShortner = ({
  className,
  titleClassName,
  desClassName,
  title,
  description,
}: HeadingShortnerProps) => {
  return (
    <div
      className={cn("flex flex-col items-center gap-3 text-center", className)}
    >
      <h1 className={cn("text-3xl font-bold", titleClassName)}>{title}</h1>
      {description && (
        <p
          className={cn(
            "text-muted-foreground text-sm font-normal ",
            desClassName,
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </div>
  )
}
