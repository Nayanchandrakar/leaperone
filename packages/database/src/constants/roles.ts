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
    permissions: [PERMISSIONS.MANAGE_NFC],
  },
]
