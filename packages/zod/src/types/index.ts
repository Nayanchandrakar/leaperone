import type z from "zod"
import type { nameChangeFormSchema } from "../schema/account"
import type { getAnalyticsSchema } from "../schema/analytics"
import type { deleteFilesSchema, getFileSchema, preSignedUrlSchema } from "../schema/asset"
import type {
  emailSchema,
  getPermissionSchema,
  loginFormSchema,
  registerFormSchema,
  resetPasswordSchema,
  restrictUserSchema,
  setNewPasswordSchema,
  updatePasswordSchema,
  userNameSchema,
  verifyEmailSchema,
} from "../schema/auth"
import type {
  deleteCardSchema,
  getBusinessCardQuerySchema,
  saveBusinessCardSchema,
  toogleCardStatusSchema,
} from "../schema/bussiness"
import type {
  impersonateSchema,
  inviteMemberSchema,
  passwordSetupSchema,
} from "../schema/invitation"
import type { contactUsFormSchema, supportFormSchema } from "../schema/marketing"
import type { checkoutSessionSchema } from "../schema/subscription"
import type { updateProfileSchema } from "../schema/user"
import type { workspaceSettingsSchema } from "../schema/workspace"

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
export type PasswordSetupSchema = z.infer<typeof passwordSetupSchema>
export type ImpersonateSchema = z.infer<typeof impersonateSchema>
export type WorkspaceSettingsSchema = z.infer<typeof workspaceSettingsSchema>
export type SaveBusinessCardSchema = z.infer<typeof saveBusinessCardSchema>
export type GetAnalyticsSchema = z.infer<typeof getAnalyticsSchema>
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>
export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
export type GetPermissionSchema = z.infer<typeof getPermissionSchema>
export type DeleteCardSchema = z.infer<typeof deleteCardSchema>
export type ToogleCardStatusSchema = z.infer<typeof toogleCardStatusSchema>
export type GetBusinessCardQuerySchema = z.infer<typeof getBusinessCardQuerySchema>
