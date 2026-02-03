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
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Team",
    icon: UsersRound,
    url: "/dashboard/teams",
    managerOnly: true,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: ChartNoAxesCombined,
  },

  {
    title: "Form Responses",
    url: "/dashboard/form-responses",
    icon: FileText,
  },

  {
    title: "File/Asset Manager",
    url: "/dashboard/asset-manager",
    icon: Folders,
  },
]

export const DASHBOARD_NAV_SETTINGS: DashboardNavSettingItem[] = [
  {
    title: "NFC Hardware",
    url: "/dashboard/nfc-hardware",
    icon: SmartphoneNfc,
    items: [
      {
        title: "Shop NFC Kits",
        url: "/dashboard/shop-nfc",
      },
      {
        title: "Activate NFC items",
        url: "/dashboard/activate-nfc",
      },
    ],
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    items: [
      {
        title: "Account Settings",
        url: "/dashboard/account-settings",
      },
      {
        title: "Manage Subscriptions",
        url: "/dashboard/subscription",
        managerOnly: true,
      },

      {
        title: "Team Settings",
        url: "/dashboard/team-settings",
        managerOnly: true,
      },

      {
        title: "Notifications",
        url: "/dashboard/notifications",
      },
      {
        title: "Form Terms & Privacy",
        url: "/dashboard/terms-and-privacy",
      },
    ],
  },
]
