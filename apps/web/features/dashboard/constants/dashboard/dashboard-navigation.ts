import {
  ChartNoAxesCombined,
  FileText,
  Folders,
  Home,
  UsersRound,
} from "lucide-react"
import type { DashboardNavMain } from "@/features/dashboard/types"

export const DASHBOARD_NAV_MAIN: DashboardNavMain[] = [
  {
    name: "Home",
    url: "dashboard",
    icon: Home,
  },
  {
    name: "Team",
    url: "teams",
    icon: UsersRound,
    teamOnly: true,
  },
  {
    name: "Analytics",
    url: "analytics",
    icon: ChartNoAxesCombined,
  },

  {
    name: "Form Responses",
    url: "form-responses",
    icon: FileText,
  },

  {
    name: "File/Asset Manager",
    url: "asset-manager",
    icon: Folders,
  },

  // {
  //   name: "NFC Hardware",
  //   url: "/teams",
  //   icon: SmartphoneNfc,
  //   items: [
  //     {
  //       title: "Shop NFC Kits",
  //       url: "/",
  //     },
  //     {
  //       title: "Activate NFC items",
  //       url: "/",
  //     },
  //   ],
  // },

  // {
  //   name: "Settings",
  //   url: "/teams",
  //   icon: Settings,
  //   items: [
  //     {
  //       title: "Account Settings",
  //       url: "/",
  //     },
  //     {
  //       title: "Manage Subscriptions",
  //       url: "/",
  //     },

  //     {
  //       title: "Notifications",
  //       url: "/",
  //     },
  //     {
  //       title: "Form Terms & Privacy",
  //       url: "/",
  //     },
  //   ],
  // },
]
