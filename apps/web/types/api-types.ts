import type { BusinessCard, File, InvitationStatus } from "@app/database/types"
import type { ContentSection, DesignEditor } from "@app/types"

export type CreateBusinessCardRes = {
  card: Pick<BusinessCard, "identifier">
}

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

export type InvitedMember = {
  name: string
  image: string
  expiresAt: Date
  memberId: string
  isRestricted: boolean
  jobRole: string | null
  status: InvitationStatus
  businessCardId: string | null
}

export type GetInvitedMembersRes = {
  members: InvitedMember[]
  seats: {
    used: number
    total: number
  }
}

export type GetWorkspaceSettingsRes = {
  createAndEdit: boolean
}

export type GetBusinessCardRes = {
  card: Pick<BusinessCard, "id" | "qrCode" | "status" | "template" | "identifier"> & {
    design?: DesignEditor
    content?: ContentSection[]
  }
}

export type DeleteCardRes = {
  message: string
}

export type ExitImpersonationMutationRes = {
  message: string
}

export type AnalyticsMember = {
  name: string
  memberId: string
}

export type GetAnalyticsMembersRes = {
  members: AnalyticsMember[]
}
