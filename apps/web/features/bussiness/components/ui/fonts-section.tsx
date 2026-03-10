export function FontSection({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={`space-y-3 ${className ?? ""}`} {...props} />
}

export function FontSectionTitle({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={`font-normal text-base ${className ?? ""}`} {...props} />
}
