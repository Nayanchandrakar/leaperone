import { cn } from "@app/ui/lib/utils"

export const SectionRoot = ({ className, ...props }: React.ComponentProps<"article">) => (
  <article
    className={cn(
      "group-data-[section=true]/section:bg-(--section-bg-color) rounded-(--section-radius)",
      className,
    )}
    {...props}
  />
)

export const SectionHeader = ({ className, ...props }: React.ComponentProps<"header">) => (
  <header className={cn("space-y-3 text-center", className)} {...props} />
)

export const SectionTitle = ({ className, ...props }: React.ComponentProps<"h2">) => (
  <h2
    className={cn(
      "text-xl xs:text-[28px] font-(--font-heading-weight) text-(--text-color)",
      className,
    )}
    {...props}
  />
)

export const SectionDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p
    className={cn(
      "text-sm xs:text-base font-(--font-body-weight) text-(--supporting-text-color)",
      className,
    )}
    {...props}
  />
)
