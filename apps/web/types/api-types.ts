import type { BusinessCard, File } from "@app/database/types"

export type LogoutMutationRes = {
  message: string
}

export type GetUserNameRes = {
  exists: boolean
}

export type RegisterMutationRes = {
  message: string
}

export type LoginMutationRes = {
  message: string
  success: boolean
}

export type PasswordSetupMutationRes = {
  message: string
  success: boolean
}

export type requestPasswordResetMutRes = {
  message: string
  success: boolean
}

export type resetPasswordMutationRes = {
  message: string
  success: boolean
}

export type ContactUsMutationRes = {
  message: string
}

export type AskSupportMutationRes = {
  message: string
}

export type BillingPortalMutationRes = {
  url: string
}

export type GetPresignedUrlRes = {
  data: {
    id: string
    url: string
  }[]
}

export type GetFilesRes = {
  results: Omit<File, "storageId">[]
  nextPage: number | undefined
}

export type DeleteFilesRes = {
  count: number
}

export type GetWorkspaceStatsRes = {
  seatsUsed: number
  totalSeats: number
  totalClicks: number
  formsSubmitted: number
  currentMonthClicks: number
}

export type GetPermissionRes = {
  permission: boolean
}

export type ToogleCardStatusRes = {
  message: string
}

// NEED_TO_UPDATE
export type InvitedMember = {
  userId: string
  name: string
  email: string
  jobRole: string | null
  username: string
  status: "pending" | "accepted"
  expiresAt: string | Date | null
  acceptedAt: string | Date | null
}

// NEED_TO_UPDATE
export type GetInvitedMembersRes = {
  data: InvitedMember[]
  seats: {
    used: number
    total: number
  }
}

export type GetWorkspaceSettingsRes = {
  createAndEdit: boolean
}

// NEED_TO_UPDATE
export type AnalyticsRecord = {
  id: string
  userId: string
  name: string
  device: string | null
  deviceVendor: string | null
  deviceModel: string | null
  browser: string | null
  browserVersion: string | null
  os: string | null
  osVersion: string | null
  country: string | null
  region: string | null
  city: string | null
  latitude: number | null
  longitude: number | null
  clickedAt: Date | string
}

// NEED_TO_UPDATE
export type GetAnalyticsRes = {
  data: {
    totalScans: number
    scansInRange: number
    records: AnalyticsRecord[]
  }
  meta: {
    ids: string[]
    toDate: string
    fromDate: string
  }
}

export type GetBusinessCardsRes = {
  card: Pick<BusinessCard, "id" | "qrCode" | "status" | "template" | "identifier">
}

export type DeleteCardRes = {
  message: string
}
