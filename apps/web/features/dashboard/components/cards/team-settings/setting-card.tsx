import { Switch } from "@app/ui/components/switch"

interface SettingCardProps {
  title: string
  description: string
  isChecked: boolean
  handleCheckedChange: () => void
}

export const SettingCard = ({
  title,
  description,
  isChecked,
  handleCheckedChange,
}: SettingCardProps) => (
  <div className="rounded-2xl sm:rounded-full p-5 sm:py-4 sm:px-9 bg-muted border border-zinc-300 flex gap-8 items-start sm:items-center justify-between max-w-3xl">
    <div className="text-start space-y-1.5">
      <p className="font-medium text-sm text-zinc-800">{title}</p>
      <p className="font-normal text-xs text-muted-foreground">{description}</p>
    </div>

    <Switch onCheckedChange={handleCheckedChange} checked={isChecked} />
  </div>
)
