import { FooterSection } from "@/components/footer/footer-section"
import { FOOTER_LINKS } from "@/constants/footer-links"

export function FooterNavigation() {
  return FOOTER_LINKS.map((data) => <FooterSection key={data.title} {...data} />)
}
