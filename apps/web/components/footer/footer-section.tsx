import Link from "next/link"
import { ListComponent } from "@/components/shared/list-component"

interface FooterSectionProps {
  title: string
  links: {
    title: string
    href: string
  }[]
}

export function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div className="text-muted-foreground">
      <h6 className="font-semibold sm:text-base text-sm">{title}</h6>
      <ListComponent
        items={links}
        className="mt-4 sm:mt-6 flex flex-col gap-y-2.5 sm:gap-y-4"
        renderItem={({ title, href }) => (
          <Link
            key={title}
            href={href}
            className="hover:text-primary transition-colors sm:text-base text-sm"
          >
            {title}
          </Link>
        )}
      />
    </div>
  )
}
