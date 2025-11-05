import type {
  CheckoutSessionSchema,
  ContactUsFormSchema,
  DeleteFilesSchema,
  EmailSchema,
  GetFileSchema,
  LoginFormSchema,
  PreSignedUrlSchema,
  RegisterFormSchema,
  ResetPasswordSchema,
  SupportFormSchema,
  UserNameFormSchema,
} from "@app/zod/types"
import { API } from "@/config/axios"
import type {
  AskSupportMutationRes,
  BillingPortalMutationRes,
  ContactUsMutationRes,
  DeleteFilesRes,
  GetFilesRes,
  GetPresignedUrlRes,
  GetUserNameRes,
  LoginMutationRes,
  LogoutMutationRes,
  RegisterMutationRes,
  requestPasswordResetMutRes,
  resetPasswordMutationRes,
} from "@/types/api-types"

export async function logoutMutation() {
  return await API.get<LogoutMutationRes>("/auth/logout")
}

export async function registerMutation(params: RegisterFormSchema) {
  return await API.post<RegisterMutationRes>("/auth/register", params)
}

export async function loginMutation(params: LoginFormSchema) {
  return await API.post<LoginMutationRes>("/auth/login", params)
}

export async function getUserName(params: UserNameFormSchema) {
  return await API.get<GetUserNameRes>("/auth/username", { params })
}

export async function requestPasswordResetMutation(params: EmailSchema) {
  return await API.post<requestPasswordResetMutRes>("/auth/request-password-reset", params)
}

export async function resetPasswordMutation(params: ResetPasswordSchema) {
  return await API.post<resetPasswordMutationRes>("/auth/reset-password", params)
}

export async function contactUsMutation(params: ContactUsFormSchema) {
  return await API.post<ContactUsMutationRes>("/marketing/contact-us", params)
}

export async function askSupportMutation(params: SupportFormSchema) {
  return await API.post<AskSupportMutationRes>("/marketing/ask-support", params)
}

export async function billingPortalMutation(params: CheckoutSessionSchema) {
  return await API.post<BillingPortalMutationRes>("/subscription/billing-portal", params)
}

export async function subscriptionUpgradeMutation(params: CheckoutSessionSchema) {
  return await API.post<BillingPortalMutationRes>("/subscription/upgrade", params)
}

export async function generatePreSignedUrl(params: PreSignedUrlSchema) {
  return await API.post<GetPresignedUrlRes>("/asset/pre-signed-url", params)
}

export async function getFiles(params: GetFileSchema) {
  return await API.post<GetFilesRes>("/asset/files", params)
}

export async function deleteFilesMutation(params: DeleteFilesSchema) {
  return await API.delete<DeleteFilesRes>("/asset/files", { data: params, timeout: 10000 })
}
