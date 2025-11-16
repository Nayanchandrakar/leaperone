import { cn } from "@app/ui/lib/utils"

interface StepperItemProps {
  title: string
  index: number
  isSelected: boolean
  onStepClick: (index: number) => void
}

// Stepper component
export const Stepper = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-zinc-50 border-gray-300 border rounded-full px-12 py-4 h-fit flex justify-between",
        className,
      )}
      {...props}
    />
  )
}

// Stepper item component
export const StepperItem = ({ title, index, isSelected, onStepClick }: StepperItemProps) => {
  return (
    <li className="flex gap-2 items-center group cursor-pointer" onClick={() => onStepClick(index)}>
      <span
        data-state={isSelected}
        className="size-6 rounded-full flex items-center justify-center font-semibold text-xs transition-colors text-zinc-500 bg-zinc-200 data-[state=true]:bg-primary data-[state=true]:text-white"
      >
        {index + 1}
      </span>
      <span
        data-state={isSelected}
        className="font-semibold text-base transition-colors text-zinc-500 data-[state=true]:text-primary"
      >
        {title}
      </span>
    </li>
  )
}
