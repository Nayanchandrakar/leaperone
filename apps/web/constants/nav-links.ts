import { CreditCard, IdCard, LifeBuoy, User } from "lucide-react"
import type { DashboardNavItem } from "@/features/dashboard/types"

export const NAV_LINKS: DashboardNavItem[] = [
  {
    title: "Smart Bussiness Card Maker",
    href: "/",
    icon: IdCard,
  },

  {
    title: "Pricing",
    href: "/pricing",
    icon: CreditCard,
  },

  {
    title: "How it Works",
    href: "/privacy-policy",
    icon: IdCard,
  },

  {
    title: "Support",
    href: "/faq-support",
    icon: LifeBuoy,
  },

  {
    title: "Contact us",
    href: "/contact-us",
    icon: User,
  },
]
