import { cn } from "@app/ui/lib/utils"

export const SectionRoot = ({ className, ...props }: React.ComponentProps<"article">) => (
  <article className={cn("bg-white rounded-3xl", className)} {...props} />
)

export const SectionHeader = ({ className, ...props }: React.ComponentProps<"header">) => (
  <header className={cn("space-y-3 text-center", className)} {...props} />
)

export const SectionTitle = ({ className, ...props }: React.ComponentProps<"h2">) => (
  <h2 className={cn("text-[28px] font-semibold text-(--text-color)", className)} {...props} />
)

export const SectionDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p className={cn("text-base font-normal text-(--supporting-text-color)", className)} {...props} />
)
