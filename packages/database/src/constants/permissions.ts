export const PERMISSIONS = {
  // NFC Management
  MANAGE_NFC: "manage:nfc",

  // Subscription Management
  MANAGE_SUBSCRIPTION: "manage:subscription",

  // Member Administration
  ADD_MEMBERS: "add:members",
  VIEW_MEMBERS: "view:members",
  REMOVE_MEMBERS: "remove:members",
  INVITE_MEMBERS: "invite:members",
  ACCESS_AS_MEMBER: "access:as-member",
  RESTRICT_MEMBERS: "restrict:members",
  UNRESTRICT_MEMBERS: "unrestrict:members",

  // Workspace Management
  MANAGE_WORKSPACE: "manage:workspace",
} as const
