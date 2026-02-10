import {
  ChartNoAxesCombined,
  FileText,
  Folders,
  Home,
  Settings,
  SmartphoneNfc,
  UsersRound,
} from "lucide-react"
import type { DashboardNavItem, DashboardNavSettingItem } from "@/features/dashboard/types"

export const DASHBOARD_NAV: DashboardNavItem[] = [
  {
    title: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Team",
    icon: UsersRound,
    href: "/dashboard/teams",
    managerOnly: true,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: ChartNoAxesCombined,
  },

  {
    title: "Form Responses",
    href: "/dashboard/form-responses",
    icon: FileText,
  },

  {
    title: "File/Asset Manager",
    href: "/dashboard/asset-manager",
    icon: Folders,
  },
]

export const DASHBOARD_NAV_SETTINGS: DashboardNavSettingItem[] = [
  {
    title: "NFC Hardware",
    href: "/dashboard/nfc-hardware",
    icon: SmartphoneNfc,
    items: [
      {
        title: "Shop NFC Kits",
        href: "/dashboard/shop-nfc",
      },
      {
        title: "Activate NFC items",
        href: "/dashboard/activate-nfc",
      },
    ],
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    items: [
      {
        title: "Account Settings",
        href: "/dashboard/account-settings",
      },
      {
        title: "Manage Subscriptions",
        href: "/dashboard/subscription",
        managerOnly: true,
      },

      {
        title: "Team Settings",
        href: "/dashboard/team-settings",
        managerOnly: true,
      },
      {
        title: "Form Terms & Privacy",
        href: "/dashboard/terms-and-privacy",
      },
    ],
  },
]
