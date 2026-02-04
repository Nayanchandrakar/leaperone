import { FileSearch, IdCard, ShoppingCart, UserRoundPlus } from "lucide-react"

export const QUICK_ACTIONS = [
  {
    id: 48293,
    href: "/",
    Icon: IdCard,
    managerOnly: false,
    title: "Share Business Card",
  },
  {
    id: 13764,
    href: "/",
    Icon: FileSearch,
    managerOnly: false,
    title: "Check Form Responses",
  },
  {
    id: 92571,
    href: "/",
    managerOnly: true,
    Icon: UserRoundPlus,
    title: "Invite Team Member",
  },
  {
    id: 68420,
    href: "/",
    managerOnly: false,
    Icon: ShoppingCart,
    title: "Buy NFC Items",
  },
]
