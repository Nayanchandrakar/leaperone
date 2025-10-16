import { CreditCard, IdCard, LifeBuoy, User } from "lucide-react"
import type { SidebarNavItems } from "@/features/dashboard/types"

export const NAV_LINKS: SidebarNavItems[] = [
  {
    name: "Smart Bussiness Card Maker",
    url: "/",
    icon: IdCard,
  },

  {
    name: "Pricing",
    url: "/pricing",
    icon: CreditCard,
  },

  {
    name: "How it Works",
    url: "/privacy-policy",
    icon: IdCard,
  },

  {
    name: "Support",
    url: "/faq-support",
    icon: LifeBuoy,
  },

  {
    name: "Contact us",
    url: "/contact-us",
    icon: User,
  },
]
