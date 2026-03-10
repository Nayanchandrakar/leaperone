import { cn } from "@app/ui/lib/utils"
import { Check, Copy } from "lucide-react"
import { useCopyToClipboard } from "@/hooks/global/use-copy-to-clipboard"

export function CopyInput({
  className,
  disabled,
  defaultValue,
  ...props
}: React.ComponentProps<"input">) {
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <div
      role="group"
      data-disabled={disabled}
      data-slot="copy-input-group"
      className="group/copy-input-group border border-input rounded-md h-9 flex overflow-hidden divide-x divide-input transition-[color,box-shadow] has-[[data-slot=copy-text-input]:focus-visible]:border-zinc-200 has-[[data-slot=copy-text-input]:focus-visible]:divide-zinc-200 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:divide-destructive"
    >
      <input
        readOnly
        type="text"
        defaultValue={defaultValue}
        data-slot="copy-text-input"
        className={cn(
          "w-full outline-none text-sm bg-muted px-3 group-data-[disabled=true]/copy-input-group:pointer-events-none group-data-[disabled=true]/copy-input-group:opacity-50 group-data-[disabled=true]/copy-input-group:cursor-not-allowed",
          className,
        )}
        {...props}
      />

      <button
        type="button"
        data-slot="copy-button"
        onClick={() => copyToClipboard(defaultValue as string)}
        className="flex-center px-3 transition-colors cursor-pointer hover:bg-muted/60 group-data-[disabled=true]/copy-input-group:pointer-events-none group-data-[disabled=true]/copy-input-group:opacity-50 group-data-[disabled=true]/copy-input-group:cursor-not-allowed text-primary [&_svg]:size-3.5"
      >
        {isCopied ? <Check /> : <Copy />}
      </button>
    </div>
  )
}
