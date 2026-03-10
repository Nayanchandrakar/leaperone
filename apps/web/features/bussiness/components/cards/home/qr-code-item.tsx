import { cn } from "@app/ui/lib/utils"

interface QrCodeItemCardProps extends React.ComponentProps<"div"> {
  label: string
}

export function QrCodeItemCard({ children, label, className, ...props }: QrCodeItemCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 items-center border border-border rounded-xl w-fit p-2.5 cursor-pointer transition-colors hover:border-primary data-[state=true]:border-primary",
        className,
      )}
      {...props}
    >
      {children}
      <p className="text-muted-foreground text-xs font-normal">{label}</p>
    </div>
  )
}
