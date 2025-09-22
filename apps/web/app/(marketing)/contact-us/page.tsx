import { Fragment } from "react"
import { ContactUsForm } from "@/features/marketing/components/forms/contact-us"
import { ContactUsHeroSection } from "@/features/marketing/components/pages/contact-us/contact-us-hero-section"

export default function ContactUsPage() {
  return (
    <Fragment>
      <ContactUsHeroSection />
      <ContactUsForm />
    </Fragment>
  )
}
