import type { LucideIcon } from "lucide-react"
import Link from "next/link"

type QuickActionsCardProps = {
  href: string
  label: string
  Icon: LucideIcon
}

export const QuickActionsCard = ({ href, label, Icon }: QuickActionsCardProps) => {
  return (
    <Link
      href={href}
      className="border border-zinc-300 rounded-xl px-6 py-7 flex flex-col gap-3 items-center hover:border-primary/80 transition-colors"
    >
      <Icon className="size-6 text-primary" />
      <p className="text-muted-foreground text-center font-normal text-sm">{label}</p>
    </Link>
  )
}
