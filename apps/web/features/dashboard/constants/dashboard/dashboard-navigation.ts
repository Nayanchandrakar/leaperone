import {
  ChartNoAxesCombined,
  FileText,
  Folders,
  Home,
  Settings,
  SmartphoneNfc,
  UsersRound,
} from "lucide-react"
import type { DashboardNavMainItem, DashboardNavSettingItem } from "@/features/dashboard/types"

export const DASHBOARD_NAV_MAIN: DashboardNavMainItem[] = [
  {
    title: "Home",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Team",
    url: "teams",
    icon: UsersRound,
    teamOnly: true,
  },
  {
    title: "Analytics",
    url: "analytics",
    icon: ChartNoAxesCombined,
  },

  {
    title: "Form Responses",
    url: "form-responses",
    icon: FileText,
  },

  {
    title: "File/Asset Manager",
    url: "asset-manager",
    icon: Folders,
  },
]

export const DASHBOARD_NAV_SETTINGS: DashboardNavSettingItem[] = [
  {
    title: "NFC Hardware",
    url: "nfc-hardware",
    icon: SmartphoneNfc,
    items: [
      {
        title: "Shop NFC Kits",
        url: "shop-nfc",
      },
      {
        title: "Activate NFC items",
        url: "activate-nfc",
      },
    ],
  },

  {
    title: "Settings",
    url: "settings",
    icon: Settings,
    items: [
      {
        title: "Account Settings",
        url: "account-settings",
      },
      {
        title: "Manage Subscriptions",
        url: "subscription",
      },

      {
        title: "Team Settings",
        url: "team-settings",
      },

      {
        title: "Notifications",
        url: "notifications",
      },
      {
        title: "Form Terms & Privacy",
        url: "terms-and-privacy",
      },
    ],
  },
]
