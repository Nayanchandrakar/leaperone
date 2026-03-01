import type { AnalyticsResult, FullSession } from "@app/types"
import type {
  CheckoutSessionSchema,
  ContactUsFormSchema,
  DeleteCardSchema,
  DeleteFilesSchema,
  EmailSchema,
  GetAnalyticsSchema,
  GetBusinessCardQuerySchema,
  GetFileSchema,
  GetPermissionSchema,
  ImpersonateSchema,
  InviteMemberSchema,
  LoginFormSchema,
  PasswordSetupSchema,
  PreSignedUrlSchema,
  RegisterFormSchema,
  ResetPasswordSchema,
  RestrictUserSchema,
  SaveBusinessCardSchema,
  SupportFormSchema,
  ToogleCardStatusSchema,
  UserNameFormSchema,
  WorkspaceSettingsSchema,
} from "@app/zod/types"
import type { AxiosRequestConfig } from "axios"
import { API } from "@/config/axios"
import type {
  AskSupportMutationRes,
  BillingPortalMutationRes,
  ContactUsMutationRes,
  CreateBusinessCardRes,
  DeleteCardRes,
  DeleteFilesRes,
  ExitImpersonationMutationRes,
  GetAnalyticsMembersRes,
  GetBusinessCardRes,
  GetFilesRes,
  GetInvitedMembersRes,
  GetPermissionRes,
  GetPresignedUrlRes,
  GetUserNameRes,
  GetWorkspaceSettingsRes,
  GetWorkspaceStatsRes,
  LoginMutationRes,
  LogoutMutationRes,
  PasswordSetupMutationRes,
  RegisterMutationRes,
  requestPasswordResetMutRes,
  resetPasswordMutationRes,
  ToogleCardStatusRes,
} from "@/types/api-types"

export async function fetchSession(config?: AxiosRequestConfig) {
  return await API.get<FullSession>("/auth/get-session", config)
}

export async function logoutMutation() {
  return await API.get<LogoutMutationRes>("/auth/logout")
}

export async function registerMutation(params: RegisterFormSchema) {
  return await API.post<RegisterMutationRes>("/auth/register", params)
}

export async function loginMutation(params: LoginFormSchema) {
  return await API.post<LoginMutationRes>("/auth/login", params)
}

export async function getUserName(params: UserNameFormSchema, signal: AbortSignal) {
  return await API.get<GetUserNameRes>("/auth/username", { params, signal })
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

export async function getWorkspaceStats() {
  return await API.get<GetWorkspaceStatsRes>("/workspace/stats")
}

export async function getAnalytics(params: GetAnalyticsSchema) {
  return await API.get<AnalyticsResult>("/analytics", { params })
}

export async function getAnalyticsMembers() {
  return await API.get<GetAnalyticsMembersRes>("/analytics/members")
}

export async function getPermission(params: GetPermissionSchema) {
  return await API.get<GetPermissionRes>("/auth/permission", { params })
}

export async function getInvitedMembers() {
  return await API.get<GetInvitedMembersRes>("/invitation/invited-members")
}

export async function inviteMemberMutation(params: InviteMemberSchema) {
  return await API.post<{ message: string }>("/invitation/invite", params)
}

// NEED_TO_UPDATE
export async function impersonateMutation(params: ImpersonateSchema) {
  return await API.post<{ message: string }>("/invitation/impersonate", params)
}

export async function exitImpersonationMutation() {
  return await API.post<ExitImpersonationMutationRes>("/invitation/exit-impersonation")
}

export async function getWorkspaceSettings() {
  return await API.get<GetWorkspaceSettingsRes>("/workspace/settings")
}

export async function updateWorkspaceSettings(params: WorkspaceSettingsSchema) {
  return await API.put<{ message: string }>("/workspace/settings", params)
}

// NEED_TO_UPDATE
export async function passwordSetupMutation(params: PasswordSetupSchema) {
  return await API.post<PasswordSetupMutationRes>("/invitation/password-setup", params)
}

export async function getBusinessCard(params?: GetBusinessCardQuerySchema) {
  return await API.get<GetBusinessCardRes>("/business-card", { params })
}

export async function deleteCardMutation(data: DeleteCardSchema) {
  return await API.delete<DeleteCardRes>("/business-card", { data })
}

export async function toogleCardStatusMutation(data: ToogleCardStatusSchema) {
  return await API.put<ToogleCardStatusRes>("/business-card/status", data)
}

export async function restrictUserMutation(params: RestrictUserSchema) {
  return await API.put<{ message: string }>("/auth/restrict", params)
}

export async function saveBusinessCardMutation(params: SaveBusinessCardSchema) {
  return await API.patch<CreateBusinessCardRes>("/business-card", params)
}
