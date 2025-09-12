import { PERMISSIONS } from "./permissions"

export const DEFAULT_ROLES = [
  {
    name: "owner",
    description: "Workspace owner with full access",
    permissions: ["*"],
  },
  {
    name: "member",
    description: "Regular workspace member",
    permissions: [
      PERMISSIONS.CREATE_CARDS,
      PERMISSIONS.MANAGE_ASSETS,
      PERMISSIONS.MANAGE_NFC,
      PERMISSIONS.UPDATE_CARDS,
    ],
  },
] as const
