import { cn } from "@app/ui/lib/utils"
import { useId } from "react"

export const AssetCardWrapper = ({ className, ...props }: React.ComponentProps<"div">) => {
  const id = useId()

  return (
    <div
      key={id}
      className={cn(
        "border h-74 rounded-xl relative bg-background transition-colors outline outline-transparent outline-offset-8 hover:outline-primary overflow-hidden flex items-center flex-col ",
        className,
      )}
      {...props}
    />
  )
}
