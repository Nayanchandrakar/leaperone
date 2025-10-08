import {
  ChartNoAxesCombined,
  FileText,
  Folders,
  Home,
  Settings,
  SmartphoneNfc,
  UsersRound,
} from "lucide-react"

export const DASHBOARD_NAV_MAIN = [
  {
    name: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    name: "Team",
    url: "/teams",
    icon: UsersRound,
  },

  {
    name: "Analytics",
    url: "/analytics",
    icon: ChartNoAxesCombined,
  },

  {
    name: "Form Responses",
    url: "/teams",
    icon: FileText,
  },

  {
    name: "File/Asset Manager",
    url: "/teams",
    icon: Folders,
  },

  {
    name: "NFC Hardware",
    url: "/teams",
    icon: SmartphoneNfc,
  },

  {
    name: "Settings",
    url: "/teams",
    icon: Settings,
    items: [
      {
        title: "Account Settings",
        url: "/",
      },
      {
        title: "Manage Subscriptions",
        url: "/",
      },

      {
        title: "Notifications",
        url: "/",
      },

      {
        title: "Form Terms & Privacy",
        url: "/",
      },
    ],
  },
]
