import { Button } from "@app/ui/components/button"
import { MapPin } from "lucide-react"

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
    <article className="space-y-4 bg-white p-8 rounded-3xl">
      <h2 className="text-[28px] font-semibold text-center text-primary">Get in touch</h2>

      <address className="w-full space-y-3 not-italic">
        <div className="text-start font-normal text-base">
          <strong className="text-primary font-normal">Contact number</strong>
          <p className="text-muted-foreground">{contactInfo.phone}</p>
        </div>

        <div className="text-start font-normal text-base">
          <strong className="text-primary font-normal">Email</strong>
          <p className="text-muted-foreground">{contactInfo.email}</p>
        </div>

        <div className="text-start font-normal text-base">
          <strong className="text-primary font-normal">Address</strong>
          <p className="text-muted-foreground">{contactInfo.address.street}</p>
          <p className="text-muted-foreground">{contactInfo.address.city}</p>
          <p className="text-muted-foreground">{contactInfo.address.state}</p>
          <p className="text-muted-foreground">{contactInfo.address.pinCode}</p>
        </div>
      </address>

      <div className="flex-center">
        <Button>
          <MapPin />
          Check Location
        </Button>
      </div>
    </article>
  )
}
