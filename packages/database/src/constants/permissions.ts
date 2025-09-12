export const PERMISSIONS = {
  // Bussiness card
  VIEW_CARDS: "iew:cards",
  UPDATE_CARDS: "update:cards",
  DELETE_CARDS: "delete:cards",
  CREATE_CARDS: "create:cards",

  // Asset manager
  MANAGE_ASSETS: "manage:assets",

  // Members / Invitations
  MANAGE_MEMBERS: "manage:members",
  INVITE_MEMBERS: "invite:members",

  // Account
  CREATE_ACCOUNT: "create:account",
  UPDATE_ACCOUNT: "update:account",
  DELETE_ACCOUNT: "delete:account",
  VIEW_ACCOUNT: "view:account",

  // Subscription
  MANAGE_SUBSCRIPTION: "manage:subscription",

  // NFC hardware
  MANAGE_NFC: "manage:nfc",
} as const
