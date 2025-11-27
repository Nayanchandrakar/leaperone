import { cn } from "@app/ui/lib/utils"
import { Pipette } from "lucide-react"

export const ColorPicker = ({
  value,
  disabled,
  className,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <div
      role="group"
      data-disabled={disabled}
      data-slot="color-picker-group"
      className="group/color-picker-group border border-input rounded-md h-9 flex overflow-hidden divide-x divide-input transition-[color,box-shadow] has-[[data-slot=color-text-input]:focus-visible]:border-zinc-200 has-[[data-slot=color-text-input]:focus-visible]:divide-zinc-200 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:divide-destructive"
    >
      <input
        type="button"
        data-slot="color-picker-swatch"
        style={{ backgroundColor: value as string }}
        className="w-14 h-full cursor-pointer group-data-[disabled=true]/color-picker-group:pointer-events-none group-data-[disabled=true]/color-picker-group:opacity-50"
      />

      <input
        type="text"
        value={value}
        data-slot="color-text-input"
        className={cn(
          "w-full outline-none text-sm bg-muted px-3 group-data-[disabled=true]/color-picker-group:pointer-events-none group-data-[disabled=true]/color-picker-group:opacity-50 group-data-[disabled=true]/color-picker-group:cursor-not-allowed",
          className,
        )}
        placeholder="enter text"
        {...props}
      />

      <div className="flex-center p-1.5" data-slot="color-picker-pipette">
        <button
          type="button"
          className={cn(
            "size-6 border flex-center rounded-full [&>svg:not([class*='size-'])]:size-3 text-zinc-500 cursor-pointer",
          )}
        >
          <Pipette />
        </button>
      </div>
    </div>
  )
}
