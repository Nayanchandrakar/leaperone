import { Check, Copy } from "lucide-react"
import { useCallback, useState } from "react"
import { toast } from "sonner"

type CopyCardLinkProps = {
  link: string
}

export function CopyCardLink({ link }: CopyCardLinkProps) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(link)
      setIsCopied(true)
      toast.success("Link copied to clipboard")
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      toast.error("Failed to copy link")
    }
  }, [link])

  return (
    <div className="flex items-center gap-2 w-fit">
      <p className="font-normal text-sm text-muted-foreground flex items-center gap-1">
        <span>Card View Link:</span>
        <span className="truncate max-w-34 sm:max-w-40">{link}</span>
      </p>
      <button
        type="button"
        disabled={isCopied}
        onClick={handleCopyLink}
        className="inline-flex items-center justify-center"
      >
        {isCopied ? (
          <Check className="size-4 text-primary" />
        ) : (
          <Copy className="size-4 text-primary cursor-pointer" />
        )}
      </button>
    </div>
  )
}
