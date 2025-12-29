export const FontSection = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div className={`space-y-3 ${className ?? ""}`} {...props} />
)

export const FontSectionTitle = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p className={`font-normal text-base ${className ?? ""}`} {...props} />
)
