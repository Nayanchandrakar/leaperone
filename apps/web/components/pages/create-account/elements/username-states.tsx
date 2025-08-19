import { CircleCheck, Info, Loader } from "lucide-react"

export const UserNameError = ({ error }: { error: string | undefined }) => {
  return (
    <span className="text-destructive flex items-center gap-1.5 text-sm font-medium transition-colors duration-400">
      <Info className="size-4" />
      {error ?? "Username already in use"}
    </span>
  )
}

export const UserNameEmpty = () => {
  return (
    <span className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium transition-colors duration-400">
      Enter your username
    </span>
  )
}

export const UserNameLoading = () => {
  return (
    <span className="text-yellow-500 flex items-center gap-1.5 text-sm font-medium transition-colors duration-400">
      <Loader className="size-4 animate-spin" />
      Checking username...
    </span>
  )
}

export const UserNameAvailable = () => {
  return (
    <span className="text-green-500 flex items-center gap-1.5 text-sm font-medium transition-colors duration-400">
      <CircleCheck className="size-4" />
      Username is available
    </span>
  )
}
