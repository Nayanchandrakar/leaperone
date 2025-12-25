import { Facebook } from "lucide-react"
import { SocialLink } from "./social-links"

export const SocialLinksSection = () => {
  return (
    <article className="space-y-6 bg-white py-9 px-10 rounded-3xl">
      <h2 className="text-[28px] text-center font-semibold text-primary">Connect with me</h2>

      <nav aria-label="Social media links">
        <ul className="w-full">
          <SocialLink icon={Facebook} label="Facebook" />
          <SocialLink icon={Facebook} label="Facebook" />
          <SocialLink icon={Facebook} label="Facebook" />
        </ul>
      </nav>
    </article>
  )
}
