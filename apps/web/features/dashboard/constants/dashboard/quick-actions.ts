import { FileSearch, IdCard, ShoppingCart, UserRoundPlus } from "lucide-react"

export const QUICK_ACTIONS = [
  {
    id: 48293,
    Icon: IdCard,
    managerOnly: false,
    href: "/dashboard",
    title: "Share Business Card",
  },
  {
    id: 13764,
    Icon: FileSearch,
    managerOnly: false,
    title: "Check Form Responses",
    href: "/dashboard/form-responses",
  },
  {
    id: 92571,
    managerOnly: true,
    Icon: UserRoundPlus,
    href: "/dashboard/teams",
    title: "Invite Team Member",
  },
  {
    id: 68420,
    managerOnly: false,
    Icon: ShoppingCart,
    title: "Buy NFC Items",
    href: "/dashboard/shop-nfc",
  },
]
