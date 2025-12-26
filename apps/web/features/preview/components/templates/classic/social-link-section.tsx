import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Icons } from "@/components/shared/icons"
import { IconBadge } from "@/features/preview/components/ui/icon-badge"
import { SectionRoot, SectionTitle } from "@/features/preview/components/ui/section"

interface SocialLinkItemProps {
  label: string
  icon: (props: React.HTMLAttributes<SVGElement>) => React.JSX.Element
}

const SocialLinkItem = ({ icon, label }: SocialLinkItemProps) => {
  return (
    <Link
      href="#"
      className="flex items-center justify-between gap-2 py-4 border-b border-border text-(--supporting-text-color) hover:text-(--highlight-color) transition-colors"
    >
      <div className="flex items-center gap-3">
        <IconBadge Icon={icon} />
        <span className="font-normal text-base">{label}</span>
      </div>
      <ArrowUpRight className="size-4.5" />
    </Link>
  )
}

export const SocialLinkSection = () => {
  return (
    <SectionRoot className="space-y-6 py-9 px-10">
      <SectionTitle className="text-center">Connect with me</SectionTitle>
      <ul>
        <SocialLinkItem icon={Icons.facebook} label="Facebook" />
        <SocialLinkItem icon={Icons.twitter} label="Twitter" />
        <SocialLinkItem icon={Icons.linkedin} label="LinkedIn" />
      </ul>
    </SectionRoot>
  )
}
