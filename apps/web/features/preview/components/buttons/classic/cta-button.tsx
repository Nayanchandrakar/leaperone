import { buttonVariants } from "@app/ui/components/button"
import { memo } from "react"

type CtaButton = {
  href: string | undefined
  label: string | undefined
}

export const CtaButton = memo(({ href, label }: CtaButton) => {
  if (!href || !label) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonVariants({
        size: "lg",
        className:
          "w-full bg-template-primary truncate font-template-button hover:bg-template-primary/90",
      })}
    >
      <span className="truncate">{label}</span>
    </a>
  )
})
