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
