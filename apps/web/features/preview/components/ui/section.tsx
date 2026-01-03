import { cn } from "@app/ui/lib/utils"

export const SectionRoot = ({
  background,
  className,
  ...props
}: React.ComponentProps<"article"> & { background?: boolean }) => (
  <article
    data-slot="section-root"
    data-background={background}
    className={cn(
      "data-[background=true]:group-data-[background=true]/section:bg-template-card rounded-template-card",
      className,
    )}
    {...props}
  />
)

export const SectionHeader = ({ className, ...props }: React.ComponentProps<"header">) => (
  <header
    data-slot="section-header"
    className={cn("space-y-3 text-center wrap-break-word", className)}
    {...props}
  />
)

export const SectionTitle = ({ className, ...props }: React.ComponentProps<"h2">) => (
  <h2
    data-slot="section-title"
    className={cn(
      "text-xl xs:text-[28px] font-template-heading text-template-foreground",
      className,
    )}
    {...props}
  />
)

export const SectionDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    data-slot="section-description"
    className={cn(
      "text-sm xs:text-base font-template-body text-template-muted-foreground",
      className,
    )}
    {...props}
  />
)
