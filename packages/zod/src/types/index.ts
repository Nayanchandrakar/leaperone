import type z from "zod"
import type { nameChangeFormSchema } from "../schema/account"
import type { getAnalyticsSchema } from "../schema/analytics"
import type { deleteFilesSchema, getFileSchema, preSignedUrlSchema } from "../schema/asset"
import type {
  emailSchema,
  loginFormSchema,
  registerFormSchema,
  resetPasswordSchema,
  restrictUserSchema,
  setNewPasswordSchema,
  updatePasswordSchema,
  userNameSchema,
  verifyEmailSchema,
} from "../schema/auth"
import type { createBusinessCardSchema } from "../schema/bussiness"
import type {
  acceptInvitationSchema,
  accessAsMemberSchema,
  inviteMemberSchema,
} from "../schema/invitation"
import type { contactUsFormSchema, supportFormSchema } from "../schema/marketing"
import type { checkoutSessionSchema } from "../schema/subscription"
import type { updateProfileSchema } from "../schema/user"
import type { workspaceCardSettingSchema } from "../schema/workspace"

export type RegisterFormSchema = z.infer<typeof registerFormSchema>
export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type UserNameFormSchema = z.infer<typeof userNameSchema>
export type VerifyEmailSchema = z.infer<typeof verifyEmailSchema>
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>
export type EmailSchema = z.infer<typeof emailSchema>
export type SetNewPasswordSchema = z.infer<typeof setNewPasswordSchema>
export type CheckoutSessionSchema = z.infer<typeof checkoutSessionSchema>
export type PreSignedUrlSchema = z.infer<typeof preSignedUrlSchema>
export type SupportFormSchema = z.infer<typeof supportFormSchema>
export type ContactUsFormSchema = z.infer<typeof contactUsFormSchema>
export type RestrictUserSchema = z.infer<typeof restrictUserSchema>
export type GetFileSchema = z.infer<typeof getFileSchema>
export type DeleteFilesSchema = z.infer<typeof deleteFilesSchema>
export type NameChangeFormSchema = z.infer<typeof nameChangeFormSchema>
export type InviteMemberSchema = z.infer<typeof inviteMemberSchema>
export type AcceptInvitationSchema = z.infer<typeof acceptInvitationSchema>
export type AccessAsMemberSchema = z.infer<typeof accessAsMemberSchema>
export type WorkspaceCardSettingSchema = z.infer<typeof workspaceCardSettingSchema>
export type CreateBusinessCardSchema = z.infer<typeof createBusinessCardSchema>
export type GetAnalyticsSchema = z.infer<typeof getAnalyticsSchema>
export type UpateProfileSchema = z.infer<typeof updateProfileSchema>
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
