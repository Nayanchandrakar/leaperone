import type z from "zod"
import type { nameChangeFormSchema } from "../schema/account"
import type { deleteFilesSchema, getFileSchema, preSignedUrlSchema } from "../schema/asset"
import type {
  emailSchema,
  loginFormSchema,
  registerFormSchema,
  resetPasswordSchema,
  restrictUserSchema,
  setNewPasswordSchema,
  userNameSchema,
  verifyEmailSchema,
} from "../schema/auth"
import type { backgroundSchema, colorSchema } from "../schema/common"
import type {
  contactSchema,
  contentEditorSchema,
  headingTextSchema,
  profileCardSchema,
} from "../schema/content-editor"
import type { designEditorSchema } from "../schema/design-editor"
import type { contactUsFormSchema, supportFormSchema } from "../schema/marketing"
import type { qrCodeEditorSchema } from "../schema/qr-code-editor"
import type { checkoutSessionSchema } from "../schema/subscription"

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
export type ContentEditorSchema = z.infer<typeof contentEditorSchema>
export type ProfileCardSchema = z.infer<typeof profileCardSchema>
export type HeadingTextSchema = z.infer<typeof headingTextSchema>
export type ContactSchema = z.infer<typeof contactSchema>
export type BackgroundSchema = z.infer<typeof backgroundSchema>
export type DesignEditorSchema = z.infer<typeof designEditorSchema>
export type ColorSchema = z.infer<typeof colorSchema>
export type QrCodeEditorSchema = z.infer<typeof qrCodeEditorSchema>
