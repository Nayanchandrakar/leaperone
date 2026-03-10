import type { LucideIcon } from "lucide-react"

type ActionItemProps = React.ComponentProps<"button"> & {
  label: string
  Icon: LucideIcon
}

export function ActionItem({ label, Icon, ...props }: ActionItemProps) {
  return (
    <button
      type="button"
      className="border border-zinc-300 rounded-xl px-6 py-7 flex flex-col gap-3 items-center hover:border-primary/80 transition-colors"
      {...props}
    >
      <Icon className="size-6 text-primary" />
      <p className="text-muted-foreground text-center font-normal text-sm">{label}</p>
    </button>
  )
}
