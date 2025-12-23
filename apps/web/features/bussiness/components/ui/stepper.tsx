import { cn } from "@app/ui/lib/utils"
import { memo } from "react"

export const Stepper = memo(function Stepper({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="stepper"
      className={cn(
        "flex p-6 items-start lg:items-center lg:flex-row flex-col lg:justify-between gap-4 border border-gray-300 bg-zinc-50 rounded-3xl lg:rounded-full lg:px-8 lg:py-4.5 xl:px-8",
        className,
      )}
      {...props}
    />
  )
})

export const StepperStep = memo(function StepperStep({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="stepper-item"
      className={cn("flex gap-2 items-center group cursor-pointer", className)}
      {...props}
    />
  )
})

export const StepperStepLabel = memo(function StepperStepLabel({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "font-semibold text-sm xl:text-base transition-colors text-zinc-500 group-data-[state=true]:text-primary",
        className,
      )}
      {...props}
    />
  )
})

export const StepperStepIndex = memo(function StepperStepIndex({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "size-6 rounded-full flex items-center justify-center font-semibold text-xs transition-colors text-zinc-500 bg-zinc-200 group-data-[state=true]:bg-primary group-data-[state=true]:text-white",
        className,
      )}
      {...props}
    />
  )
})
