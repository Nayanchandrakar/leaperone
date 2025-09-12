import { PERMISSIONS } from "./permissions"

export type DefaultRole = {
  name: string
  description: string
  permissions: string[]
}

export const DEFAULT_ROLES: DefaultRole[] = [
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
]
