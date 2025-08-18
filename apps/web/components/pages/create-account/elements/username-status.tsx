import { cn } from "@myleaper/ui/lib/utils"
import { CircleCheck, Info, Loader } from "lucide-react"
import type { FieldError } from "react-hook-form"
import type { StatusConfig, StatusState } from "@/types/create-account"

export interface UsernameStatusProps {
  username: string
  isPending: boolean
  error: FieldError | undefined
  exists: boolean | undefined
}

export const STATUS_CONFIG: Record<StatusState, StatusConfig> = {
  error: {
    className: "text-destructive",
    Icon: <Info className="size-4" />,
    text: (error) => error ?? "Username already in use",
  },
  empty: {
    className: "text-muted-foreground",
    text: () => "Enter your username",
  },
  pending: {
    className: "text-yellow-500",
    Icon: <Loader className="size-4 animate-spin" />,
    text: () => "Checking username...",
  },
  available: {
    className: "text-green-500",
    Icon: <CircleCheck className="size-4" />,
    text: () => "Username is available",
  },
}

export const UsernameStatus = ({
  username,
  error,
  isPending,
  exists,
}: UsernameStatusProps) => {
  let state: StatusState = "available"

  if (error?.message || (!isPending && !!exists)) state = "error"
  else if (!username.length) state = "empty"
  else if (isPending) state = "pending"

  const { Icon, text, className } = STATUS_CONFIG[state]

  return (
    <div
      className={cn(
        "text-sm font-medium transition-colors duration-400",
        className,
      )}
    >
      <span className="flex items-center gap-1.5">
        {Icon && <Icon className="size-4" />}
        {text(error?.message)}
      </span>
    </div>
  )
}
