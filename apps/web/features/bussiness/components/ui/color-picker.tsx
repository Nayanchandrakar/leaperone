import { Popover, PopoverContent, PopoverTrigger } from "@app/ui/components/popover"
import { cn } from "@app/ui/lib/utils"
import { Pipette } from "lucide-react"
import { HexAlphaColorPicker } from "react-colorful"

interface ColorPickerProps extends Omit<React.ComponentProps<"input">, "onChange" | "value"> {
  color: string
  onColorChange: (color: string) => void
}

export function ColorPicker({
  color,
  disabled,
  className,
  onColorChange,
  ...props
}: ColorPickerProps) {
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
        style={{ backgroundColor: color }}
        className="w-14 h-full cursor-pointer group-data-[disabled=true]/color-picker-group:pointer-events-none group-data-[disabled=true]/color-picker-group:opacity-50"
      />

      <input
        type="text"
        value={color}
        data-slot="color-text-input"
        className={cn(
          "w-full outline-none text-sm bg-muted px-3 group-data-[disabled=true]/color-picker-group:pointer-events-none group-data-[disabled=true]/color-picker-group:opacity-50 group-data-[disabled=true]/color-picker-group:cursor-not-allowed",
          className,
        )}
        onChange={(color) => onColorChange(color?.target?.value)}
        {...props}
      />

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex-center p-1.5 transition-colors cursor-pointer hover:bg-muted/60 group-data-[disabled=true]/color-picker-group:pointer-events-none group-data-[disabled=true]/color-picker-group:opacity-50 group-data-[disabled=true]/color-picker-group:cursor-not-allowed"
            data-slot="color-picker-pipette"
          >
            <span className="size-6 border flex-center rounded-full bg-white text-muted-foreground">
              <Pipette className="size-3" />
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <HexAlphaColorPicker color={color} onChange={onColorChange} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
