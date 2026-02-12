import { ToolTipProvider } from "@/features/subscription/components/ui/tooltip-provider"

type StatusItemProps = {
  color: string
  label: string
  description: string
}

export const StatusItem = ({ color, description, label }: StatusItemProps) => (
  <div className="flex items-center gap-2">
    <p
      style={{ "--status-color": color } as React.CSSProperties}
      className="text-muted-foreground font-normal text-sm before:content-[''] before:inline-block before:size-2 before:bg-(--status-color) before:rounded-full before:mr-3 before:mb-px"
    >
      {label}
    </p>
    <ToolTipProvider content={description} />
  </div>
)
