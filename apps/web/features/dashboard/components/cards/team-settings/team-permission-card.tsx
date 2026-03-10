import { Switch } from "@app/ui/components/switch"
import { cn } from "@app/ui/lib/utils"

type TeamPermissionCardProps = {
  title: string
  className?: string
  description: string
  checked: boolean | undefined
  disabled?: boolean
  onCheckedChange: (checked: boolean) => void
}

export function TeamPermissionCard({
  title,
  checked,
  disabled,
  className,
  description,
  onCheckedChange,
}: TeamPermissionCardProps) {
  return (
    <div
      className={cn(
        "border rounded-xl bg-muted p-5 flex justify-between items-start md:items-center gap-7",
        className,
      )}
    >
      <div className="text-start space-y-1.5">
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="font-normal text-xs text-muted-foreground">{description}</p>
      </div>

      <Switch checked={Boolean(checked)} onCheckedChange={onCheckedChange} disabled={disabled} />
    </div>
  )
}
