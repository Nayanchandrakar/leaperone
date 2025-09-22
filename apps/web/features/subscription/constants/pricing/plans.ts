import { User, Users } from "lucide-react"

export const PLANS = [
  {
    id: "individual",
    name: "Solo Plan",
    users: {
      title: "For 1 user",
      Icon: User,
    },
    pricing: {
      monthly: {
        price: 9.99,
        billingNote: "per month,<br/> billed monthly",
      },
      yearly: {
        price: 7.99,
        billingNote: "per month,<br/> billed annually",
      },
    },
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
    id: "team",
    name: "Team Plan",
    users: {
      title: "Minimum 2 users",
      Icon: Users,
    },
    pricing: {
      monthly: {
        price: 14.99,
        billingNote: "per user, per month,<br/> billed monthly",
      },
      yearly: {
        price: 11.99,
        billingNote: "per user, per month,<br/> billed annually",
      },
    },
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
