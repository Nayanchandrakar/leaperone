import { Button } from "@app/ui/components/button"
import { MapPin } from "lucide-react"
import {
  ContactInfoItem,
  ContactInfoValue,
} from "@/features/preview/components/ui/contact-info-item"
import { SectionRoot, SectionTitle } from "@/features/preview/components/ui/section"

interface ContactInfo {
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    pinCode: string
  }
}

interface ContactSectionProps {
  contactInfo: ContactInfo
}

export const ContactSection = ({ contactInfo }: ContactSectionProps) => {
  return (
    <SectionRoot className="space-y-4 p-8">
      <SectionTitle className="text-center">Get in touch</SectionTitle>

      <address className="w-full space-y-3 not-italic">
        <ContactInfoItem label="Contact number">
          <ContactInfoValue>{contactInfo.phone}</ContactInfoValue>
        </ContactInfoItem>

        <ContactInfoItem label="Email">
          <ContactInfoValue>{contactInfo.email}</ContactInfoValue>
        </ContactInfoItem>

        <ContactInfoItem label="Address">
          <ContactInfoValue>{contactInfo.address.street}</ContactInfoValue>
          <ContactInfoValue>{contactInfo.address.city}</ContactInfoValue>
          <ContactInfoValue>{contactInfo.address.state}</ContactInfoValue>
          <ContactInfoValue>{contactInfo.address.pinCode}</ContactInfoValue>
        </ContactInfoItem>
      </address>

      <div className="flex-center">
        <Button className="bg-(--highlight-color) hover:bg-(--highlight-color)/90">
          <MapPin />
          Check Location
        </Button>
      </div>
    </SectionRoot>
  )
}
