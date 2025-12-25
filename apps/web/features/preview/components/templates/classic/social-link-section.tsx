import { Facebook } from "lucide-react"
import { SocialLink } from "@/features/preview/components/templates/classic/social-links"
import { SectionRoot, SectionTitle } from "@/features/preview/components/ui/section"

export const SocialLinksSection = () => {
  return (
    <SectionRoot className="space-y-6 py-9 px-10">
      <SectionTitle>Connect with me</SectionTitle>

      <nav aria-label="Social media links">
        <ul className="w-full">
          <SocialLink icon={Facebook} label="Facebook" />
          <SocialLink icon={Facebook} label="Facebook" />
          <SocialLink icon={Facebook} label="Facebook" />
        </ul>
      </nav>
    </SectionRoot>
  )
}
