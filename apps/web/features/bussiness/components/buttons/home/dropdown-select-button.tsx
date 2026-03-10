import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@app/ui/components/dropdown-menu"
import type { SelectOption } from "@/features/bussiness/types"

interface DropdownSelectButtonProps<T extends string = string> {
  children: React.ReactNode
  options: SelectOption<T>[]
  onSelect: (value: T) => void
}

export function DropdownSelectButton<T extends string = string>({
  onSelect,
  options,
  children,
}: DropdownSelectButtonProps<T>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" side="bottom">
        <DropdownMenuGroup>
          {options.map(({ value, label }) => (
            <DropdownMenuItem key={value} onClick={() => onSelect(value)}>
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
