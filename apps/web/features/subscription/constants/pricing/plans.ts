import { User, Users } from "lucide-react"
import type { Plan } from "@/features/subscription/types"

export const PLANS: Plan[] = [
  {
    id: 34534534,
    type: "individual",
    title: "Solo Plan",
    header: {
      title: "For 1 user",
      Icon: User,
    },
    billingNote: {
      monthly: "per month,<br/> billed monthly",
      yearly: "per month,<br/> billed annually",
    },
    pricing: { monthly: 9.99, yearly: 7.99 },
    buttonLink: {
      label: "Compare Solo & Team Plans",
      href: "#compare-pricing",
    },
    feature: {
      title: "Key Features",
      details: [
        "Easy to use built-in CRM tools",
        "Branded Digital Business Card with custom designed QR Code & NFC features",
        "Unlimited sharing and scans of Digital Business Card",
        "Lead capture via forms",
        "Contact collection of leads and clients at one place",
        "Advanced analytics",
        "Unlimited usage of AI business card scanner",
      ],
    },
  },
  {
    id: 45645645,
    type: "team",
    title: "Team Plan",
    header: {
      title: "Minimum 2 users",
      Icon: Users,
    },
    billingNote: {
      monthly: "per user, per month,<br/> billed monthly",
      yearly: "per user, per month,<br/> billed annually",
    },
    pricing: { monthly: 14.99, yearly: 11.99 },
    buttonLink: {
      label: "See Pricing by Team Size",
      href: "#plan-pricing",
    },
    feature: {
      title: "Everything in Solo Plan, plus:",
      details: [
        "Everything in Solo Plan, plus:",
        "Team specific advanced CRM features",
        "Each team member gets branded Digital Business Card with QR Code & NFC features",
        "Multi-user login & permission control",
        "Admin dashboard to manage team members",
        "View CRM reports and team performance analytics",
        "Access Form Responses of all team users",
        "Assign leads and tasks across the team",
      ],
    },
  },
]
